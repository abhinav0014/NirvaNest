"""
Create database tables for development.

Run with: python backend/scripts/create_db.py
"""
import asyncio

from app.db.session import engine
from app.db.models import Base


async def run():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


if __name__ == "__main__":
    asyncio.run(run())
