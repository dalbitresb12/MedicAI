from app.domain.model.clinical_history import ClinicalHistory
from app.schemas.request.create_clinical_history_request import CreateClinicalHistoryRequest
from app.schemas.response.clinical_history_response import ClinicalHistoryResponse

class ClinicalHistoryMapper:
    
    @staticmethod
    def requestToModel(request: CreateClinicalHistoryRequest, medic_id: int, medic_full_name: str) -> ClinicalHistory:
        return ClinicalHistory(
            patient_email=request.patient_email,
            patient_full_name=request.patient_full_name,
            medic_id=medic_id,
            medic_full_name=medic_full_name,
            symptoms=request.symptoms,
            diagnosis=request.diagnosis,
            medications=request.medications,
            treatment=request.treatment
        )

    @staticmethod
    def modelToResponse(history: ClinicalHistory) -> ClinicalHistoryResponse:
        return ClinicalHistoryResponse(**history.dict())
