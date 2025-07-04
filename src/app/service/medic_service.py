# app/service/medic_service.py
from datetime import date
from typing import List
from app.domain.persistence.medic_repository import MedicRepository
from app.mapping.medic_mapper import MedicMapper
from app.schemas.request.medic_create_request import MedicCreateRequest
from app.schemas.request.medic_update_request import MedicUpdateRequest
from app.schemas.response.medic_response import MedicResponse

class MedicService:
    def __init__(self, repository: MedicRepository):  
        self.repository = repository


    def create_profile_for_medic(self, user_id: int, data: MedicCreateRequest) -> MedicResponse:
        # Verifica que no exista ya un perfil
        existing = self.repository.find_by_user_id(user_id)
        if existing:
            raise ValueError("El perfil del médico ya fue registrado.")

        # Crear nuevo
        from app.domain.model.medic import Medic
        medic = Medic(
            user_id=user_id,
            specialty=data.specialty,
            years_experience=data.years_experience,
            presentation=data.presentation,
            profile_picture_url=data.profile_picture_url,
            enabled=True
        )
        self.repository.save(medic)

        return MedicMapper.to_response(medic)

    def list_all(self) -> List[MedicResponse]:
        return [MedicMapper.to_response(m) for m in self.repository.get_all()]

    def list_by_specialty(self, specialty: str) -> List[MedicResponse]:
        return [MedicMapper.to_response(m) for m in self.repository.get_by_specialty(specialty)]

    def list_by_name(self, name: str) -> List[MedicResponse]:
        return [MedicMapper.to_response(m) for m in self.repository.get_by_name(name)]
    
    def update_profile_picture(self, user_id: int, url: str):
        medic = self.repository.find_by_user_id(user_id)
        if not medic:
            raise ValueError("El perfil del médico no existe.")
        medic.profile_picture_url = url
        self.repository.session.commit()



    def get_by_id(self, medic_id: int):
        return self.repository.find_by_id(medic_id)

    

    def update_profile_for_medic(self, user_id: int, data: MedicUpdateRequest) -> MedicResponse:
        medic = self.repository.find_by_user_id(user_id)
        if not medic:
            raise ValueError("El perfil del médico no existe.")

        # Actualiza solo los campos que vienen
        if data.specialty is not None:
            medic.specialty = data.specialty
        if data.years_experience is not None:
            medic.years_experience = data.years_experience
        if data.presentation is not None:
            medic.presentation = data.presentation
        if data.profile_picture_url and data.profile_picture_url.strip():
           medic.profile_picture_url = data.profile_picture_url.strip()

        self.repository.session.commit()
        self.repository.session.refresh(medic)
        return MedicMapper.to_response(medic)




