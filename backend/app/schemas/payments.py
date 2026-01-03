from pydantic import BaseModel
from typing import Optional


class CreateOrderRequest(BaseModel):
    listing_id: str
    amount: int
    currency: Optional[str] = "NPR"


class CreateOrderResponse(BaseModel):
    order_id: str
    status: str


class InitiatePaymentResponse(BaseModel):
    payment_id: str
    provider: str
    checkout_url: Optional[str] = None
    detail: Optional[str] = None


class PaymentWebhookPayload(BaseModel):
    provider: str
    provider_payment_id: str
    status: str
    amount: int
    currency: str
