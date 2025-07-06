from pydantic import BaseModel
from datetime import datetime

class ClinicalHistoryResponse(BaseModel):
    id: int
    patient_email: str
    patient_full_name: str
    medic_id: int
    medic_full_name: str
    symptoms: str
    diagnosis: str
    medications: str
    treatment: str
    created_at: datetime
