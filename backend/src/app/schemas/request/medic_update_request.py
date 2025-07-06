# app/schemas/request/medic_update_request.py
from typing import Optional
from pydantic import BaseModel

class MedicUpdateRequest(BaseModel):
    specialty: Optional[str] = None
    years_experience: Optional[int] = None
    presentation: Optional[str] = None
    profile_picture_url: Optional[str] = None  # nombre del archivo si ya fue subido

