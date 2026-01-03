try:
    # pydantic v2.12+ moved BaseSettings into pydantic-settings package
    from pydantic import BaseSettings
except Exception:
    from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "NirvaNest Backend"
    database_url: str = "postgresql+asyncpg://user:password@localhost:5432/nirvanest"
    environment: str = "development"
    secret_key: str = "replace-with-secure-random"

    class Config:
        env_file = ".env"


settings = Settings()
