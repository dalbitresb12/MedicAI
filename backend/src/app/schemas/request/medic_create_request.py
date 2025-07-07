from pydantic import BaseModel


class MedicCreateRequest(BaseModel):
    specialty: str
    years_experience: int | None = None
    presentation: str | None = None
    profile_picture_url: str | None = None
