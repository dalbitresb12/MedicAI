from dependency_injector import containers, providers
from sqlmodel import Session
from app.core.database import engine  # Usa directamente el engine

from app.domain.persistence.clinical_history_repository import (
    ClinicalHistoryRepository,
)
from app.domain.persistence.medic_repository import MedicRepository
from app.security.domain.persistence.user_repository import UserRepository
from app.security.service.auth_service import AuthService
from app.security.service.user_service import UserService

from app.domain.persistence.appointment_repository import AppointmentRepository
from app.service.appointment_service import AppointmentService
from app.service.clinical_history_service import ClinicalHistoryService
from app.service.email_service import EmailService
from app.service.medic_service import MedicService


# Función para crear una sesión nueva
def get_session() -> Session:
    return Session(engine)


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        packages=[
            "app.security.api",
            "app.api",
            "app.crosscutting",
        ]
    )

    # Session de SQLModel como Singleton (o puedes usar Factory si deseas una nueva por request)
    session = providers.Singleton(get_session)

    # Repositories
    userRepository = providers.Factory(UserRepository, session=session)
    appointmentRepository = providers.Factory(
        AppointmentRepository, session=session
    )
    medicRepository = providers.Factory(MedicRepository, session=session)
    clinicalHistoryRepository = providers.Factory(
        ClinicalHistoryRepository, session=session
    )

    # Services
    userService = providers.Factory(UserService, userRepository=userRepository)
    authService = providers.Factory(AuthService, userRepository=userRepository)
    emailService = providers.Factory(EmailService)

    appointmentService = providers.Factory(
        AppointmentService,
        repository=appointmentRepository,
        email_service=emailService,
    )

    medicService = providers.Factory(MedicService, repository=medicRepository)

    clinicalHistoryService = providers.Factory(
        ClinicalHistoryService, repository=clinicalHistoryRepository
    )
