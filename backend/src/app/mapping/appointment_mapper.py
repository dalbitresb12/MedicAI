from app.domain.model.appointment import Appointment
from app.schemas.response.appointment_response import AppointmentResponse
from app.schemas.request.create_appointment_request import CreateAppointmentRequest

class AppointmentMapper:
    
    @staticmethod
    def modelToResponse(appointment: Appointment) -> AppointmentResponse:
        return AppointmentResponse(
            id=appointment.id,
            patient_email=appointment.patient_email,
            patient_full_name=appointment.patient_full_name,
            patient_age=appointment.patient_age,
            medic_full_name=appointment.medic_full_name,
            specialty=appointment.specialty,
            day=appointment.day,
            hour=appointment.hour
        )

    @staticmethod
    def requestToModel(request: CreateAppointmentRequest, medic_full_name: str, specialty: str) -> Appointment:
        return Appointment(
            patient_email=request.patient_email,
            patient_full_name=request.patient_full_name,
            patient_age=request.patient_age,
            medic_full_name=medic_full_name,
            specialty=specialty,
            day=request.day,
            hour=request.hour
        )
