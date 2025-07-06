from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from sqlalchemy import Column, ForeignKey



if TYPE_CHECKING:
    from app.security.domain.model.user import User

class Medic(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", nullable=False)
    specialty: str
    years_experience: Optional[int] = None
    presentation: Optional[str] = None
    profile_picture_url: Optional[str] = None
    enabled: bool = True

    user: Optional["User"] = Relationship()
