from pydantic import BaseModel

from app.security.schemas.response.user_response import UserResponse


class AuthResponse(BaseModel):
    access_token: str | None
    token_type: str | None
    userResponse: UserResponse | None
