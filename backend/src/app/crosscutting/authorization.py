from dependency_injector.wiring import Provide, inject
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.container import Container
from app.security.domain.model.user import Role, User
from app.security.service.auth_service import AuthService

security = HTTPBearer()


# Extrae el usuario autenticado a partir del token JWT
@inject
def getAuthenticatedUser(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    authService: AuthService = Depends(Provide[Container.authService]),
) -> User:
    return authService.validateJWToken(token=credentials.credentials)


# Valida que el usuario tenga un rol permitido
def authorizeRoles(roles: list[Role]):
    @inject
    def wrapper(
        current_user: User = Depends(getAuthenticatedUser),
        authService: AuthService = Depends(Provide[Container.authService]),
    ) -> User:
        authService.authorizeRoles(current_user, roles)
        return current_user

    return wrapper
