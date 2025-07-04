from datetime import date, time
from sqlmodel import Session, select
from typing import List, Optional
from app.domain.model.appointment import Appointment
from app.core.base_repository import BaseRepository  # Asegúrate de importar correctamente

class AppointmentRepository(BaseRepository[Appointment]):
    def __init__(self, session: Session):
        super().__init__(Appointment, session)

    def save(self, appointment: Appointment) -> Appointment:
        self.session.add(appointment)
        self.session.commit()
        self.session.refresh(appointment)
        return appointment

    def find_by_id(self, appointment_id: int) -> Optional[Appointment]:
        return self.session.get(Appointment, appointment_id)

    def find_all(self) -> List[Appointment]:
        return self.session.exec(select(Appointment)).all()

    def delete_by_id(self, appointment_id: int) -> None:
        appointment = self.find_by_id(appointment_id)
        if appointment:
            self.session.delete(appointment)
            self.session.commit()

    def find_by_medic_day_hour(self, medic_full_name: str, day: date, hour: time) -> Optional[Appointment]:
        return self.session.exec(
            select(Appointment)
            .where(Appointment.medic_full_name == medic_full_name)
            .where(Appointment.day == day)
            .where(Appointment.hour == hour)
        ).first()
    

    def find_by_medic_and_day(self, medic_name: str, day: date) -> List[Appointment]:
        return self.session.exec(
            select(Appointment)
            .where(Appointment.medic_full_name == medic_name)
            .where(Appointment.day == day)
        ).all()
