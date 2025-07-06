from fastapi import APIRouter, Depends
from app.security.mapping.auth_mapper import AuthMapper
from app.security.schemas.request.login_user_request import LoginUserRequest
from app.security.schemas.request.register_user_request import RegisterUserRequest
from app.security.schemas.response.auth_response import AuthResponse
from dependency_injector.wiring import inject, Provide


from app.security.service.auth_service import AuthService
from app.core.container import Container

# Definir el router con prefijo y etiqueta
router = APIRouter(
    prefix="/api/v1/auth",  # Prefijo para todas las rutas de autenticación
    tags=["auth"]  # Etiqueta que agrupa las rutas bajo "auth"
)

# Registro de usuario
@router.post("/register", response_model=AuthResponse,
              description="Registra un nuevo usuario en el sistema. "
                "Se debe proporcionar nombre completo, email, contraseña y rol (ej. PATIENT o MEDIC). "
                "Retorna los datos del usuario registrado junto con un JWT para autenticación.")
@inject
async def registerUser(request: RegisterUserRequest,
                        authService: AuthService = Depends(Provide[Container.authService])):
    user = authService.register(AuthMapper.registerRequestToModel(request))
    token = authService.createJWToken(user.email)
    return AuthMapper.ModelToResponseWithToken(user, token)

# Inicio de sesión
@router.post("/login", response_model=AuthResponse,
             description="Inicia sesión en el sistema. "
                "Se debe proporcionar email y contraseña válidos. "
                "Retorna los datos del usuario y un JWT para autenticación.")
@inject
async def loginUser(request: LoginUserRequest,
                    authService: AuthService = Depends(Provide[Container.authService])):
    user = authService.authenticate(request.email, request.password)
    token = authService.createJWToken(user.email)
    return AuthMapper.ModelToResponseWithToken(user, token)