from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date, time

class Appointment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    patient_email: str
    patient_full_name: str
    patient_age: int
    medic_full_name: str
    specialty: str
    day: date
    hour: time
