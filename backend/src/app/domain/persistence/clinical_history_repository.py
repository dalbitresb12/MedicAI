from sqlmodel import Session, select
from typing import List
from app.domain.model.clinical_history import ClinicalHistory

class ClinicalHistoryRepository:
    def __init__(self, session: Session):
        self.session = session

    def save(self, history: ClinicalHistory) -> ClinicalHistory:
        self.session.add(history)
        self.session.commit()
        self.session.refresh(history)
        return history

    def find_by_patient_email(self, email: str) -> List[ClinicalHistory]:
        return self.session.exec(
            select(ClinicalHistory).where(ClinicalHistory.patient_email == email)
        ).all()
    
    def find_by_patient_name(self, name: str) -> List[ClinicalHistory]:
        return self.session.exec(select(ClinicalHistory).where(ClinicalHistory.patient_full_name.ilike(f"%{name}%"))).all()
