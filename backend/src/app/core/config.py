from pathlib import Path

from pydantic import DirectoryPath, Field, ValidationError
from pydantic_settings import BaseSettings, SettingsConfigDict

from app.crosscutting.logging import get_logger

logger = get_logger(__name__)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local"),
        env_file_encoding="utf-8",
        env_ignore_empty=True,
        extra="ignore",
    )

    api_version: str = Field(default=...)
    debug_mode: bool = Field(default=False)
    static_directory: DirectoryPath = Field(
        default_factory=lambda: Path.cwd() / "static"
    )
    uploads_directory: DirectoryPath = Field(
        default_factory=lambda: Path.cwd() / "uploads"
    )

    database_url: str = Field(default=...)
    origin_url: list[str] = Field(default=[])
    public_logo_url: str = Field(default="")
    initial_admin_username: str = Field(default=...)
    initial_admin_email: str = Field(default=...)
    initial_admin_full_name: str = Field(default=...)
    initial_admin_password: str = Field(default=...)
    secret_key: str = Field(default=...)
    algorithm: str = Field(default=...)
    access_token_expire_minutes: int = Field(default=...)

    postmark_api_key: str = Field(default=...)
    email_sender: str = Field(default=...)


try:
    settings = Settings()
except ValidationError as e:
    logger.error("Error loading settings: %s", e.json())
    raise
