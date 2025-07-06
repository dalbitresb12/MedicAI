from pydantic import BaseModel, EmailStr
from typing import Optional
from app.security.domain.model.user import Role

class CreateUserRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    phone: str
    full_name: str
    role: Optional[Role] = Role.PATIENT  # por defecto patient