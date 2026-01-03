from datetime import datetime, timedelta
from typing import Optional
import uuid

from jose import jwt

from app.core.config import settings


ALGORITHM = "HS256"


def create_access_token(subject: str, expires_minutes: int = 15) -> str:
    now = datetime.utcnow()
    payload = {
        "sub": subject,
        "iat": now.timestamp(),
        "exp": (now + timedelta(minutes=expires_minutes)).timestamp(),
        "type": "access",
    }
    return jwt.encode(payload, settings.secret_key, algorithm=ALGORITHM)


def create_refresh_token(subject: str, expires_days: int = 7) -> (str, str):
    now = datetime.utcnow()
    jti = str(uuid.uuid4())
    payload = {
        "sub": subject,
        "iat": now.timestamp(),
        "exp": (now + timedelta(days=expires_days)).timestamp(),
        "type": "refresh",
        "jti": jti,
    }
    token = jwt.encode(payload, settings.secret_key, algorithm=ALGORITHM)
    return token, jti


def decode_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])
    except Exception:
        return None
