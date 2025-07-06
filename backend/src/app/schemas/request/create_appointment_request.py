from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date, time

class CreateAppointmentRequest(BaseModel):
    medic_id: int
    patient_age: int
    day: date
    hour: time

    # Estos se rellenan en backend, por eso deben ser opcionales
    patient_email: Optional[EmailStr] = None
    patient_full_name: Optional[str] = None
    medic_full_name: Optional[str] = None
    specialty: Optional[str] = None
