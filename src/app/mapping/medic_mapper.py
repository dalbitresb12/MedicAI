# app/domain/mapping/medic_mapper.py
from app.domain.model.medic import Medic
from app.schemas.response.medic_response import MedicResponse


class MedicMapper:
    @staticmethod
    def to_response(medic: Medic) -> MedicResponse:
        return MedicResponse(
            id=medic.id,
            specialty=medic.specialty,
            full_name=medic.user.full_name,
            email=medic.user.email,
            profile_picture_url=medic.profile_picture_url
        )
