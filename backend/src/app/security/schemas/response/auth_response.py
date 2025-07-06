from typing import Optional
from pydantic import BaseModel

from app.security.schemas.response.user_response import UserResponse


class AuthResponse(BaseModel):
    access_token: Optional[str]
    token_type: Optional[str]
    userResponse: Optional[UserResponse]