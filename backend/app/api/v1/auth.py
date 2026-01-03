from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert
from passlib.context import CryptContext
import secrets

from app.db.session import get_db
from app.db import models
from app.core import security
from app.core.config import settings
from app.core.deps import get_current_user

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()


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


@router.post("/request", response_model=RequestOTPResponse)
async def request_otp(req: RequestOTPRequest, db: AsyncSession = Depends(get_db)):
    # generate 6-digit OTP
    code = f"{secrets.randbelow(10**6):06d}"
    code_hash = pwd_ctx.hash(code)
    expires_at = datetime.utcnow() + timedelta(minutes=5)

    otp = models.OTPToken(phone_number=req.phone_number, code_hash=code_hash, expires_at=expires_at)
    db.add(otp)
    await db.commit()

    resp = {"detail": "OTP generated"}
    # For development ease, return OTP in response when environment=development
    if settings.environment == "development":
        resp["dev_otp"] = code
    return resp


@router.post("/verify", response_model=TokenResponse)
async def verify_otp(req: VerifyOTPRequest, db: AsyncSession = Depends(get_db)):
    q = select(models.OTPToken).where(models.OTPToken.phone_number == req.phone_number).order_by(models.OTPToken.created_at.desc())
    result = await db.execute(q)
    otp: Optional[models.OTPToken] = result.scalars().first()
    if not otp:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No OTP found")
    if otp.used:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP already used")
    if datetime.utcnow() > otp.expires_at:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP expired")
    if not pwd_ctx.verify(req.code, otp.code_hash):
        otp.attempts = otp.attempts + 1
        await db.commit()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP")

    # mark OTP used
    otp.used = True
    await db.commit()

    # find or create user
    q = select(models.User).where(models.User.phone_number == req.phone_number)
    r = await db.execute(q)
    user = r.scalars().first()
    if not user:
        user = models.User(phone_number=req.phone_number)
        db.add(user)
        await db.commit()
        await db.refresh(user)

    # create tokens
    access = security.create_access_token(str(user.id))
    refresh_token, jti = security.create_refresh_token(str(user.id))

    # store refresh token record
    expires_at = datetime.utcnow() + timedelta(days=7)
    rt = models.RefreshToken(user_id=user.id, jti=jti, expires_at=expires_at)
    db.add(rt)
    await db.commit()

    return {"access_token": access, "refresh_token": refresh_token, "token_type": "bearer"}


class RefreshRequest(BaseModel):
    refresh_token: str


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(req: RefreshRequest, db: AsyncSession = Depends(get_db)):
    payload = security.decode_token(req.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    jti = payload.get("jti")
    sub = payload.get("sub")
    q = select(models.RefreshToken).where(models.RefreshToken.jti == jti)
    r = await db.execute(q)
    rt: Optional[models.RefreshToken] = r.scalars().first()
    if not rt or rt.revoked or rt.expires_at < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token invalid or revoked")

    # rotate: revoke old token and issue a new refresh token
    rt.revoked = True
    await db.commit()

    access = security.create_access_token(str(sub))
    new_refresh_token, new_jti = security.create_refresh_token(str(sub))
    expires_at = datetime.utcnow() + timedelta(days=7)
    new_rt = models.RefreshToken(user_id=sub, jti=new_jti, expires_at=expires_at)
    db.add(new_rt)
    await db.commit()

    return {"access_token": access, "refresh_token": new_refresh_token, "token_type": "bearer"}


@router.post("/logout")
async def logout(req: RefreshRequest, db: AsyncSession = Depends(get_db)):
    payload = security.decode_token(req.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")
    jti = payload.get("jti")
    q = select(models.RefreshToken).where(models.RefreshToken.jti == jti)
    r = await db.execute(q)
    rt: Optional[models.RefreshToken] = r.scalars().first()
    if not rt:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Token not found")
    rt.revoked = True
    await db.commit()
    return {"detail": "logged out"}


@router.get("/me")
async def me(user: models.User = Depends(get_current_user)):
    return {"id": str(user.id), "phone_number": user.phone_number, "is_active": user.is_active}
