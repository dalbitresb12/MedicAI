from pydantic import BaseModel, ConfigDict


class MedicResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    specialty: str
    full_name: str
    email: str
    profile_picture_url: str | None = None
