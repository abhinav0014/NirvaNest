from typing import Dict
import uuid


class PaymentProviderStub:
    """A simple stub for payment providers used in development.

    Methods return a provider_payment_id and a checkout_url (if applicable).
    """

    def create_payment(self, order_id: str, amount: int, currency: str, provider: str) -> Dict:
        provider_payment_id = f"{provider}_{uuid.uuid4()}"
        # In real integrations you'd call provider SDK/API and return a checkout url or status
        return {
            "provider_payment_id": provider_payment_id,
            "status": "created",
            "checkout_url": f"https://pay.example/{provider}/{provider_payment_id}",
        }

    def verify_notification(self, payload: Dict) -> Dict:
        # Normalize provider webhook to internal format
        # For stub: echo back
        return {
            "provider": payload.get("provider"),
            "provider_payment_id": payload.get("provider_payment_id"),
            "status": payload.get("status"),
            "amount": payload.get("amount"),
            "currency": payload.get("currency"),
        }


provider = PaymentProviderStub()
