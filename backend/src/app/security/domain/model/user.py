from sqlmodel import SQLModel, Field
from enum import Enum
from typing import Optional

class Role(str, Enum):
    PATIENT="patient"
    ADMIN ="admin"
    MEDIC = "medic"

class User(SQLModel, table=True):
    id:Optional[int]=Field(primary_key=True)
    username: str = Field(nullable=False, sa_column_kwargs={"unique": True, "nullable": False})
    email: str = Field(nullable=False, sa_column_kwargs={"unique": True, "nullable": False})  # Email único e indexado
    full_name: str = Field(nullable=False)  # Nombre completo
    hashed_password: str = Field(nullable=False)  # Contraseña hasheada
    enabled: Optional[bool] = Field(default=True)  # Estado de deshabilitado
    role: Optional[Role] = Field(default=Role.PATIENT)

    