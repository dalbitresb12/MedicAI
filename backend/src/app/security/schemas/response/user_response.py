from pydantic import BaseModel

from app.security.domain.model.user import Role


class UserResponse(BaseModel):
    id: int | None
    username: str | None
    email: str | None
    full_name: str | None
    enabled: bool | None
    role: Role | None
