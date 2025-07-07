from pydantic import BaseModel


class MedicResponse(BaseModel):
    id: int
    specialty: str
    full_name: str
    email: str
    profile_picture_url: str | None = None

    class Config:
        orm_mode = True
