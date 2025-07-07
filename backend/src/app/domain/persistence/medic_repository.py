from sqlalchemy.orm import Session

from app.domain.model.medic import Medic
from app.security.domain.model.user import User


class MedicRepository:
    def __init__(self, session: Session):
        self.session = session

    def save(self, medic: Medic) -> Medic:
        """Guarda o actualiza un perfil de médico."""
        self.session.add(medic)
        self.session.commit()
        self.session.refresh(medic)
        return medic

    def find_by_id(self, medic_id: int) -> Medic | None:
        return self.session.query(Medic).filter(Medic.id == medic_id).first()

    def find_by_user_id(self, user_id: int) -> Medic | None:
        """Busca un médico por el ID del usuario relacionado."""
        return (
            self.session.query(Medic).filter(Medic.user_id == user_id).first()
        )

    def get_all(self) -> list[Medic]:
        """Obtiene todos los médicos habilitados."""
        return self.session.query(Medic).filter(Medic.enabled == True).all()

    def get_by_specialty(self, specialty: str) -> list[Medic]:
        """Filtra médicos por especialidad (busqueda parcial e insensible a mayúsculas)."""
        return (
            self.session.query(Medic)
            .filter(
                Medic.specialty.ilike(f"%{specialty}%"), Medic.enabled == True
            )
            .all()
        )

    def get_by_name(self, name: str) -> list[Medic]:
        return (
            self.session.query(Medic)
            .join(User)  # Hacemos join con la tabla User
            .filter(User.full_name.ilike(f"%{name}%"), Medic.enabled == True)
            .all()
        )
