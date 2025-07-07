from pydantic import BaseModel

from app.security.domain.model.user import User


class AccessResponse(BaseModel):
    id: int | None
    is_connected: bool | None
    user_id: int | None
    user: User | None
