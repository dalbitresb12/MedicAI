from datetime import date, time

from pydantic import BaseModel, EmailStr


class AppointmentResponse(BaseModel):
    id: int | None
    patient_email: EmailStr
    patient_full_name: str
    patient_age: int
    medic_full_name: str
    specialty: str
    day: date
    hour: time
