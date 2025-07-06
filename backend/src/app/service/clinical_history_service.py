from typing import List
from app.domain.persistence.clinical_history_repository import ClinicalHistoryRepository
from app.mapping.clinical_history_mapper import ClinicalHistoryMapper
from app.schemas.request.create_clinical_history_request import CreateClinicalHistoryRequest
from app.schemas.response.clinical_history_response import ClinicalHistoryResponse

class ClinicalHistoryService:
    def __init__(self, repository: ClinicalHistoryRepository):
        self.repository = repository

    def create(self, request: CreateClinicalHistoryRequest, medic_id: int, medic_full_name: str) -> ClinicalHistoryResponse:
        model = ClinicalHistoryMapper.requestToModel(request, medic_id, medic_full_name)
        saved = self.repository.save(model)
        return ClinicalHistoryMapper.modelToResponse(saved)

    def get_by_patient_email(self, email: str) -> list[ClinicalHistoryResponse]:
        records = self.repository.find_by_patient_email(email)
        return [ClinicalHistoryMapper.modelToResponse(h) for h in records]
    
    def get_by_patient_name(self, name: str) -> List[ClinicalHistoryResponse]:
        records = self.repository.find_by_patient_name(name)
        return [ClinicalHistoryMapper.modelToResponse(r) for r in records]
