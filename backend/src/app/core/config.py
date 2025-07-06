from dotenv import load_dotenv
from pydantic import Field, ValidationError
from pydantic_settings import BaseSettings
from app.crosscutting.logging import get_logger

load_dotenv()  

logger = get_logger(__name__)

class Settings(BaseSettings):
    api_version: str = Field(..., env="API_VERSION")
    debug_mode: bool = Field(..., env="DEBUG_MODE")

    database_url: str = Field(..., env="DATABASE_URL")
    origin_url: str = Field(..., env="ORIGIN_URL")
    initial_admin_username: str = Field(..., env="INITIAL_ADMIN_USERNAME")
    initial_admin_email: str = Field(..., env="INITIAL_ADMIN_EMAIL")
    initial_admin_full_name: str = Field(..., env="INITIAL_ADMIN_FULL_NAME")
    initial_admin_password: str = Field(..., env="INITIAL_ADMIN_PASSWORD")
    secret_key: str = Field(..., env="SECRET_KEY")
    algorithm: str = Field(..., env="ALGORITHM")
    access_token_expire_minutes: int = Field(..., env="ACCESS_TOKEN_EXPIRE_MINUTES")


    sendgrid_api_key: str = Field(..., env="SENDGRID_API_KEY")
    email_sender: str = Field(..., env="EMAIL_SENDER")




    class Config:
        env_file = ".env"

try:
    settings = Settings()
except ValidationError as e:
    logger.error("Error loading settings: %s", e.json())
    raise