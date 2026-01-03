from fastapi import FastAPI
from app.api.v1 import health as health_router
from app.api.v1 import auth as auth_router
from app.api.v1 import listings as listings_router
from app.api.v1 import payments as payments_router
from app.core.config import settings

app = FastAPI(title=settings.app_name)

app.include_router(health_router.router, prefix="/api/v1")
app.include_router(auth_router.router, prefix="/api/v1/auth")
app.include_router(listings_router.router, prefix="/api/v1/listings")
app.include_router(payments_router.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"service": settings.app_name, "status": "ok"}
