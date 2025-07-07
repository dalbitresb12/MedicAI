from sqlmodel import Field, Relationship, SQLModel

from app.security.domain.model.user import User


class Medic(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", nullable=False)
    specialty: str
    years_experience: int | None = None
    presentation: str | None = None
    profile_picture_url: str | None = None
    enabled: bool = True

    user: User | None = Relationship()
