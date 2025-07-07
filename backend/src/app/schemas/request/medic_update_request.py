# app/schemas/request/medic_update_request.py


from pydantic import BaseModel


class MedicUpdateRequest(BaseModel):
    specialty: str | None = None
    years_experience: int | None = None
    presentation: str | None = None
    profile_picture_url: str | None = (
        None  # nombre del archivo si ya fue subido
    )
