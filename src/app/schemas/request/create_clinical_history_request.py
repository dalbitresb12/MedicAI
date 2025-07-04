from pydantic import BaseModel
from typing import Optional

class CreateClinicalHistoryRequest(BaseModel):
    patient_email: str
    patient_full_name: str
    symptoms: str
    diagnosis: str
    medications: str
    treatment: str
