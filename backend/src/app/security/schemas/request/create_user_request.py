from pydantic import BaseModel, EmailStr

from app.security.domain.model.user import Role


class CreateUserRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    phone: str
    full_name: str
    role: Role | None = Role.PATIENT  # por defecto patient
