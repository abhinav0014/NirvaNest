from pydantic import BaseModel
from typing import Optional


class ListingCreate(BaseModel):
    title: str
    description: Optional[str] = None
    price: Optional[int] = None
    currency: Optional[str] = "NPR"
    is_auction: bool = False
    negotiable: bool = False
    category: Optional[str] = None
    location: Optional[str] = None


class ListingRead(BaseModel):
    id: str
    owner_id: str
    title: str
    description: Optional[str] = None
    price: Optional[int] = None
    currency: Optional[str]
    is_auction: bool
    negotiable: bool
    category: Optional[str]
    location: Optional[str]
    is_published: bool

    class Config:
        orm_mode = True
