from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from app.db.session import get_db
from app.db import models
from app.schemas import payments as schema
from app.core.deps import get_current_user
from app.services import payment_provider
from datetime import datetime, timedelta

router = APIRouter()


@router.post("/orders", response_model=schema.CreateOrderResponse)
async def create_order(req: schema.CreateOrderRequest, db: AsyncSession = Depends(get_db), user: models.User = Depends(get_current_user)):
    # ensure listing exists and not deleted
    q = select(models.Listing).where(models.Listing.id == req.listing_id, models.Listing.deleted == False)
    r = await db.execute(q)
    listing = r.scalars().first()
    if not listing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")
    # check for existing pending orders for this listing
    q2 = select(models.Order).where(models.Order.listing_id == req.listing_id, models.Order.status.in_(["pending","held"]))
    r2 = await db.execute(q2)
    existing = r2.scalars().first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Listing currently locked by another order")

    order = models.Order(buyer_id=user.id, listing_id=req.listing_id, amount=req.amount, currency=req.currency, status="pending", locked=True)
    db.add(order)
    await db.commit()
    await db.refresh(order)
    return {"order_id": str(order.id), "status": order.status}


@router.post("/orders/{order_id}/pay", response_model=schema.InitiatePaymentResponse)
async def initiate_payment(order_id: str, provider: str = "esewa", db: AsyncSession = Depends(get_db), user: models.User = Depends(get_current_user)):
    q = select(models.Order).where(models.Order.id == order_id)
    r = await db.execute(q)
    order = r.scalars().first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    if str(order.buyer_id) != str(user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")
    if order.status not in ("pending",):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Order not payable")

    # create provider payment (stub)
    res = payment_provider.provider.create_payment(str(order.id), order.amount, order.currency, provider)
    provider_payment_id = res["provider_payment_id"]
    payment = models.Payment(order_id=order.id, provider=provider, provider_payment_id=provider_payment_id, status="initiated", amount=order.amount, currency=order.currency)
    db.add(payment)
    # mark order as held while payment pending
    order.status = "held"
    await db.commit()
    await db.refresh(payment)
    return {"payment_id": str(payment.id), "provider": provider, "checkout_url": res.get("checkout_url"), "detail": "payment initiated (stub)"}


@router.post("/payments/webhook")
async def payment_webhook(payload: schema.PaymentWebhookPayload, db: AsyncSession = Depends(get_db), request: Request = None):
    # normalize via provider service
    data = payment_provider.provider.verify_notification(payload.dict())
    provider = data["provider"]
    provider_payment_id = data["provider_payment_id"]
    status = data["status"]

    q = select(models.Payment).where(models.Payment.provider == provider, models.Payment.provider_payment_id == provider_payment_id)
    r = await db.execute(q)
    payment = r.scalars().first()
    if not payment:
        # idempotent: if payment unknown, return 200 to avoid retries from provider
        return {"detail": "ignored"}

    # idempotency: if status already final, return
    if payment.status in ("succeeded", "failed"):
        return {"detail": "already processed"}

    if status.lower() in ("paid", "captured", "succeeded"):
        payment.status = "succeeded"
        # finalize order
        q2 = select(models.Order).where(models.Order.id == payment.order_id)
        r2 = await db.execute(q2)
        order = r2.scalars().first()
        if order:
            order.status = "completed"
            order.locked = False
    else:
        payment.status = "failed"
        q2 = select(models.Order).where(models.Order.id == payment.order_id)
        r2 = await db.execute(q2)
        order = r2.scalars().first()
        if order:
            order.status = "cancelled"
            order.locked = False

    await db.commit()
    return {"detail": "processed"}


@router.get("/orders/{order_id}")
async def get_order(order_id: str, db: AsyncSession = Depends(get_db), user: models.User = Depends(get_current_user)):
    q = select(models.Order).where(models.Order.id == order_id)
    r = await db.execute(q)
    order = r.scalars().first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    if str(order.buyer_id) != str(user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")
    return {"order_id": str(order.id), "status": order.status, "locked": order.locked}
