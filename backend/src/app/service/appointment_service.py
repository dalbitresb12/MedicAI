from datetime import date, datetime, time, timedelta

from fastapi import HTTPException, status

from app.domain.model.appointment import Appointment
from app.domain.persistence.appointment_repository import AppointmentRepository
from app.service.email_service import EmailService


class AppointmentService:
    def __init__(
        self, repository: AppointmentRepository, email_service: EmailService
    ):
        self.repository = repository
        self.email_service = email_service

    def create(self, appointment: Appointment) -> Appointment:
        # Verificar si ya existe una cita para ese médico, día y hora
        existing = self.repository.find_by_medic_day_hour(
            medic_full_name=appointment.medic_full_name,
            day=appointment.day,
            hour=appointment.hour,
        )
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Esa hora ya está reservada para el médico",
            )
            # Guardar cita en la base de datos
        saved_appointment = self.repository.save(appointment)

        # Enviar email de confirmación al paciente
        try:
            self.email_service.sendConfirmationEmail(saved_appointment)
        except Exception as e:
            # No interrumpir el flujo aunque falle el email, pero registrar
            print(f"[ERROR] Fallo al enviar correo de cita: {e}")

        return saved_appointment

    def get_all(self):
        appointments = self.repository.find_all()
        if not appointments:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No hay citas registradas",
            )
        return appointments

    def get_by_id(self, appointment_id: int):
        appointment = self.repository.find_by_id(appointment_id)
        if not appointment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cita no encontrada",
            )
        return appointment

    def get_occupied_hours(self, medic_name: str, day: date) -> list[str]:
        appointments = self.repository.find_by_medic_and_day(medic_name, day)
        return [appt.hour.strftime("%H:%M") for appt in appointments]

    def get_schedule_status(
        self, medic_name: str, day: date
    ) -> dict[str, list[str]]:
        # Horario base (puedes mover esto a settings si lo necesitas dinámico)
        start_hour = time(8, 0)
        end_hour = time(17, 0)
        interval = timedelta(minutes=30)

        # Generar todas las horas posibles
        current = datetime.combine(day, start_hour)
        end = datetime.combine(day, end_hour)
        all_slots = []
        while current <= end:
            all_slots.append(current.time().strftime("%H:%M"))
            current += interval

        # Obtener ocupados desde BD
        occupied = self.get_occupied_hours(medic_name, day)

        # Calcular disponibles
        available = [h for h in all_slots if h not in occupied]

        return {"occupied": occupied, "available": available}
