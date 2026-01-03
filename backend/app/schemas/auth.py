from pydantic import BaseModel
from typing import Optional


class RequestOTPRequest(BaseModel):
    phone_number: str


class RequestOTPResponse(BaseModel):
    detail: str
    dev_otp: Optional[str] = None


class VerifyOTPRequest(BaseModel):
    phone_number: str
    code: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
