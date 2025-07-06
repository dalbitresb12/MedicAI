from typing import List
from fastapi import APIRouter, Depends, status
from dependency_injector.wiring import inject, Provide
from app.schemas.request.create_clinical_history_request import CreateClinicalHistoryRequest
from app.schemas.response.clinical_history_response import ClinicalHistoryResponse
from app.crosscutting.authorization import getAuthenticatedUser, authorizeRoles
from app.security.domain.model.user import Role, User
from app.core.container import Container
from app.service.clinical_history_service import ClinicalHistoryService

router = APIRouter(
    prefix="/api/v1/history",
    tags=["Clinical History"]
)

@router.post("/", response_model=ClinicalHistoryResponse, status_code=status.HTTP_201_CREATED,
             dependencies=[Depends(authorizeRoles([Role.MEDIC]))],
               description="Permite a un médico crear un historial clínico para un paciente. "
                "Debe incluir información como síntomas, diagnóstico y tratamiento.")
@inject
def create_history(
    request: CreateClinicalHistoryRequest,
    current_user: User = Depends(getAuthenticatedUser),
    service: ClinicalHistoryService = Depends(Provide[Container.clinicalHistoryService])
):
    return service.create(request, medic_id=current_user.id, medic_full_name=current_user.full_name)

@router.get("/by-patient-email/{email}", response_model=List[ClinicalHistoryResponse],
            dependencies=[Depends(authorizeRoles([Role.ADMIN, Role.MEDIC]))],
            description="Devuelve el historial clínico de un paciente identificado por su email. "
                "Disponible solo para médicos y administradores.")
@inject
def get_history_by_patient_email(
    email: str,
    service: ClinicalHistoryService = Depends(Provide[Container.clinicalHistoryService])
):
    return service.get_by_patient_email(email)

@router.get("/by-patient-name/{name}", response_model=List[ClinicalHistoryResponse],
            dependencies=[Depends(authorizeRoles([Role.ADMIN, Role.MEDIC]))],
             description="Devuelve el historial clínico de un paciente por nombre completo o parcial. "
                "Visible solo para médicos y administradores.")
@inject
def get_history_by_patient_name(
    name: str,
    service: ClinicalHistoryService = Depends(Provide[Container.clinicalHistoryService])
):
    return service.get_by_patient_name(name)

@router.get("/me", response_model=List[ClinicalHistoryResponse],
            dependencies=[Depends(authorizeRoles([Role.PATIENT]))],
            description="Permite a un paciente autenticado ver su propio historial clínico completo.")
@inject
def get_my_history(
    current_user: User = Depends(getAuthenticatedUser),
    service: ClinicalHistoryService = Depends(Provide[Container.clinicalHistoryService])
):
    return service.get_by_patient_email(current_user.email)
