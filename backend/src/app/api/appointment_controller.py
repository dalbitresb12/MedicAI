from datetime import date

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, HTTPException, status

from app.core.container import Container
from app.crosscutting.authorization import authorizeRoles, getAuthenticatedUser
from app.mapping.appointment_mapper import AppointmentMapper
from app.schemas.request.create_appointment_request import (
    CreateAppointmentRequest,
)
from app.schemas.response.appointment_response import AppointmentResponse
from app.security.domain.model.user import Role, User
from app.service.appointment_service import AppointmentService
from app.service.medic_service import MedicService

router = APIRouter(prefix="/api/v1/appointments", tags=["appointments"])


@router.post(
    "/create",
    response_model=AppointmentResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(authorizeRoles([Role.PATIENT]))],
    description="Permite a un paciente agendar una cita médica con un médico específico. "
    "Requiere que el paciente esté autenticado y que el médico esté disponible en la fecha y hora solicitadas.",
)
@inject
async def createAppointment(
    request: CreateAppointmentRequest,
    current_user: User = Depends(getAuthenticatedUser),
    service: AppointmentService = Depends(
        Provide[Container.appointmentService]
    ),
    medic_service: MedicService = Depends(Provide[Container.medicService]),
):
    # Obtener datos del paciente
    request.patient_email = current_user.email
    request.patient_full_name = current_user.full_name

    # Buscar al médico por ID
    medic = medic_service.get_by_id(request.medic_id)
    if not medic:
        raise HTTPException(status_code=404, detail="Médico no encontrado")

    # Mapear y guardar
    model = AppointmentMapper.requestToModel(
        request, medic_full_name=medic.user.full_name, specialty=medic.specialty
    )
    appointment = service.create(model)
    return AppointmentMapper.modelToResponse(appointment)


@router.get(
    "/schedule/{medic_id}/{day}",
    response_model=dict,
    description="Retorna todos los horarios ocupados y disponibles de un médico en un día específico. "
    "Útil para que el paciente visualice los espacios libres antes de agendar una cita.",
)
@inject
def get_schedule_status(
    medic_id: int,
    day: date,
    appointment_service: AppointmentService = Depends(
        Provide[Container.appointmentService]
    ),
    medic_service: MedicService = Depends(Provide[Container.medicService]),
):
    medic = medic_service.get_by_id(medic_id)
    if not medic:
        raise HTTPException(status_code=404, detail="Médico no encontrado")

    return appointment_service.get_schedule_status(medic.user.full_name, day)
