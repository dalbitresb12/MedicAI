from app.security.domain.model.user import User, Role
from app.security.domain.persistence.user_repository import UserRepository
from app.security.service.auth_service import pwd_context
from app.core.config import settings


def defaultData(userRepository: UserRepository):
    if not userRepository.findByUsername(settings.initial_admin_username):
        userRepository.save(
            User(
                username=settings.initial_admin_username,
                email=settings.initial_admin_email,
                full_name=settings.initial_admin_full_name,
                hashed_password=pwd_context.hash(
                    settings.initial_admin_password
                ),
                enabled=True,
                role=Role.ADMIN,
            )
        )
