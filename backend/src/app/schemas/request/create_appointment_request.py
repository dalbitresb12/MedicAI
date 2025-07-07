from datetime import date, time

from pydantic import BaseModel, EmailStr


class CreateAppointmentRequest(BaseModel):
    medic_id: int
    patient_age: int
    day: date
    hour: time

    # Estos se rellenan en backend, por eso deben ser opcionales
    patient_email: EmailStr | None = None
    patient_full_name: str | None = None
    medic_full_name: str | None = None
    specialty: str | None = None
