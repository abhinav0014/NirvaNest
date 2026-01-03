from datetime import datetime, timedelta
from typing import Any
from sqlalchemy import select
from app.db.session import AsyncSessionLocal
from app.db import models
from app.services import payment_provider


async def audit_payments(ctx: Any) -> None:
    """Find payments stuck in 'initiated' and reconcile via provider (idempotent).

    Intended to run periodically.
    """
    async with AsyncSessionLocal() as session:
        cutoff = datetime.utcnow() - timedelta(minutes=30)
        q = select(models.Payment).where(models.Payment.status == "initiated", models.Payment.created_at <= cutoff)
        result = await session.execute(q)
        payments = result.scalars().all()
        for p in payments:
            try:
                # Ask provider for status (stubbed)
                payload = {"provider": p.provider, "provider_payment_id": p.provider_payment_id, "status": "paid", "amount": p.amount, "currency": p.currency}
                data = payment_provider.provider.verify_notification(payload)
                status = data.get("status")
                if status and status.lower() in ("paid", "captured", "succeeded"):
                    p.status = "succeeded"
                    # finalize order
                    q2 = select(models.Order).where(models.Order.id == p.order_id)
                    r2 = await session.execute(q2)
                    order = r2.scalars().first()
                    if order:
                        order.status = "completed"
                        order.locked = False
                else:
                    p.status = "failed"
                    q2 = select(models.Order).where(models.Order.id == p.order_id)
                    r2 = await session.execute(q2)
                    order = r2.scalars().first()
                    if order:
                        order.status = "cancelled"
                        order.locked = False
                await session.commit()
            except Exception:
                await session.rollback()


async def finalize_auctions(ctx: Any) -> None:
    """Placeholder auction finalizer.

    In a full implementation this would:
    - find auctions that ended
    - determine highest valid bidder transactionally
    - create an order for the winner and lock listing
    - notify parties
    - schedule payment deadline jobs
    """
    async with AsyncSessionLocal() as session:
        # For now, find listings marked is_auction=True and log if any exist needing finalization.
        cutoff = datetime.utcnow()  # placeholder filter
        q = select(models.Listing).where(models.Listing.is_auction == True)
        result = await session.execute(q)
        auctions = result.scalars().all()
        # no-op: real logic requires bids table and auction_end timestamp
        if auctions:
            # In production, enqueue individual finalization tasks per auction
            for a in auctions:
                pass
