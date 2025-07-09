from datetime import datetime

from sqlmodel import Field, SQLModel


class ClinicalHistory(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    patient_email: str  # Podemos usar email si no tienes tabla de pacientes aún
    patient_full_name: str
    medic_id: int
    medic_full_name: str
    symptoms: str
    diagnosis: str
    medications: str
    treatment: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
