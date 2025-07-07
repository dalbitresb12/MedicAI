from datetime import date, time

from sqlmodel import Field, SQLModel


class Appointment(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    patient_email: str
    patient_full_name: str
    patient_age: int
    medic_full_name: str
    specialty: str
    day: date
    hour: time
