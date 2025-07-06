
from typing import Optional
from pydantic import BaseModel


class MedicCreateRequest(BaseModel):
    specialty: str
    years_experience: Optional[int] = None
    presentation: Optional[str] = None
    profile_picture_url: Optional[str] = None  