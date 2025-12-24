"""
Centralized application settings for MarketStreamX backend.

- Loads environment variables from .env using pydantic-settings
- Provides CORS origins, API prefix, DB/Redis URLs, and feature flags
- Exposes a singleton `settings` instance for use throughout the app

Environment variables (.env):
- APP_NAME=MarketStreamX
- API_PREFIX=/api
- FRONTEND_ORIGIN=http://127.0.0.1:5173
- DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/marketstreamx
- REDIS_URL=redis://localhost:6379/0
- USE_MOCK_DATA=true
- LOG_LEVEL=INFO
- ENV=development
- WS_BASE=ws://127.0.0.1:8000
"""
from __future__ import annotations

from typing import List
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Core
    app_name: str = "MarketStreamX"
    environment: str = "development"  # development | staging | production
    log_level: str = "INFO"

    # API
    api_prefix: str = "/api"

    # Frontend/CORS
    frontend_origin: str = "http://127.0.0.1:5173"
    extra_cors_origins: List[str] = []

    # Data stores (optional during mock phase)
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/marketstreamx"
    redis_url: str = "redis://localhost:6379/0"

    # Feature flags
    use_mock_data: bool = True

    # WebSocket base (optional; frontend will usually derive from window.location)
    ws_base: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", case_sensitive=False)

    @field_validator("api_prefix")
    @classmethod
    def _ensure_api_prefix(cls, v: str) -> str:
        if not v.startswith("/"):
            return f"/{v}"
        return v

    @property
    def cors_origins(self) -> List[str]:
        # Always include local dev defaults in addition to configured origin
        defaults = [
            self.frontend_origin,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
        # Remove empties and duplicates
        merged = list(dict.fromkeys([o for o in defaults + self.extra_cors_origins if o]))
        return merged


# Singleton instance for application imports
settings = Settings()  # type: ignore[call-arg]
