from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, time

class AppointmentResponse(BaseModel):
    id: Optional[int]
    patient_email: EmailStr
    patient_full_name: str
    patient_age: int
    medic_full_name: str
    specialty: str
    day: date
    hour: time
