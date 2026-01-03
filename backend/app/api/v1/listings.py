from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_
from app.db.session import get_db
from app.db import models
from app.schemas import listings as schema
from app.core.deps import get_current_user

router = APIRouter()


@router.post("/", response_model=schema.ListingRead)
async def create_listing(payload: schema.ListingCreate, db: AsyncSession = Depends(get_db), user: models.User = Depends(get_current_user)):
    listing = models.Listing(
        owner_id=user.id,
        title=payload.title,
        description=payload.description,
        price=payload.price,
        currency=payload.currency,
        is_auction=payload.is_auction,
        negotiable=payload.negotiable,
        category=payload.category,
        location=payload.location,
    )
    db.add(listing)
    await db.commit()
    await db.refresh(listing)
    return listing


@router.get("/{listing_id}", response_model=schema.ListingRead)
async def get_listing(listing_id: str, db: AsyncSession = Depends(get_db)):
    q = select(models.Listing).where(models.Listing.id == listing_id, models.Listing.deleted == False)
    r = await db.execute(q)
    listing = r.scalars().first()
    if not listing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")
    return listing


@router.get("/", response_model=List[schema.ListingRead])
async def list_listings(
    db: AsyncSession = Depends(get_db),
    category: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    min_price: Optional[int] = Query(None),
    max_price: Optional[int] = Query(None),
    is_auction: Optional[bool] = Query(None),
    negotiable: Optional[bool] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    filters = [models.Listing.deleted == False, models.Listing.is_published == True]
    if category:
        filters.append(models.Listing.category == category)
    if location:
        filters.append(models.Listing.location == location)
    if is_auction is not None:
        filters.append(models.Listing.is_auction == is_auction)
    if negotiable is not None:
        filters.append(models.Listing.negotiable == negotiable)
    if min_price is not None:
        filters.append(models.Listing.price >= min_price)
    if max_price is not None:
        filters.append(models.Listing.price <= max_price)

    q = select(models.Listing).where(and_(*filters)).limit(limit).offset(offset)
    r = await db.execute(q)
    return r.scalars().all()
