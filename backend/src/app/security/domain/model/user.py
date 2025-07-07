from enum import Enum

from sqlmodel import Field, SQLModel


class Role(str, Enum):
    PATIENT = "patient"
    ADMIN = "admin"
    MEDIC = "medic"


class User(SQLModel, table=True):
    id: int | None = Field(primary_key=True)
    username: str = Field(
        nullable=False, sa_column_kwargs={"unique": True, "nullable": False}
    )
    email: str = Field(
        nullable=False, sa_column_kwargs={"unique": True, "nullable": False}
    )  # Email único e indexado
    full_name: str = Field(nullable=False)  # Nombre completo
    hashed_password: str = Field(nullable=False)  # Contraseña hasheada
    enabled: bool | None = Field(default=True)  # Estado de deshabilitado
    role: Role | None = Field(default=Role.PATIENT)
