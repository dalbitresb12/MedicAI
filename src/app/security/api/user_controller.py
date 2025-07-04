from fastapi import APIRouter, Depends
from app.security.schemas.request.update_password_request import UpdatePasswordRequest
from app.security.schemas.request.update_user_request import UpdateUserRequest
from app.security.schemas.response.user_response import UserResponse
from app.security.schemas.request.create_user_request import CreateUserRequest
from dependency_injector.wiring import inject, Provide
from app.security.domain.model.user import Role, User

from app.crosscutting.authorization import authorizeRoles, getAuthenticatedUser

from app.security.mapping.user_mapper import UserMapper
from app.security.service.user_service import UserService
from app.core.container import Container

# Definir el router con prefijo y etiqueta
router = APIRouter(
    prefix="/api/v1/users",
    tags=["users"]
)

# Obtener usuario por nombre de usuario (solo accesible por ADMIN)
@router.get("/by-username/{username}", response_model=UserResponse, dependencies=[Depends(authorizeRoles([Role.ADMIN]))],
               description="Obtiene la información de un usuario por su username. Solo accesible por usuarios con rol ADMIN.",)
@inject
async def getUserByUsername(username: str, 
                            userService: UserService = Depends(Provide[Container.userService])):
    user = userService.getByUsername(username)
    return UserMapper.modelToResponse(user)

# Obtener usuario por ID (solo accesible por ADMIN)
@router.get("/by-id/{userId}", response_model=UserResponse, 
             description="Obtiene la información de un usuario por su ID. Solo accesible por usuarios con rol ADMIN.",
            dependencies=[Depends(authorizeRoles([Role.ADMIN]))])
@inject
async def getUserById(userId: int, 
                      userService: UserService = Depends(Provide[Container.userService])):
    user = userService.getById(userId)
    return UserMapper.modelToResponse(user)

# Crear un nuevo usuario (solo ADMIN puede crear cualquier rol)
@router.post("/create", response_model=UserResponse,
              description="Crea un nuevo usuario. Solo los administradores pueden usar este endpoint.",
              dependencies=[Depends(authorizeRoles([Role.ADMIN]))])
@inject
async def createUser(request: CreateUserRequest, 
                     userService: UserService = Depends(Provide[Container.userService])):
    new_user = userService.createUser(request)
    return UserMapper.modelToResponse(new_user)


# Obtener todos los usuarios (solo accesible por ADMIN)
@router.get("/all", response_model=list[UserResponse], 
            description="Obtiene la lista de todos los usuarios registrados. Solo accesible por ADMIN.",
            dependencies=[Depends(authorizeRoles([Role.ADMIN]))])
@inject
async def getAllUsers(userService: UserService = Depends(Provide[Container.userService])):
    users = userService.getAll()
    return [UserMapper.modelToResponse(user) for user in users]

# Actualizar usuario por ID (solo accesible por ADMIN)
@router.put("/update/{userId}", response_model=UserResponse, 
                description="Actualiza el nombre completo de un usuario por su ID. Solo ADMIN puede realizar esta acción.",
                dependencies=[Depends(authorizeRoles([Role.ADMIN]))])
@inject
async def updateUserById(userId: int, 
                         request: UpdateUserRequest, 
                         userService: UserService = Depends(Provide[Container.userService])):
    user = userService.updateById(userId, request.full_name)
    return UserMapper.modelToResponse(user)

# Eliminar usuario por ID (solo accesible por ADMIN)
@router.delete("/delete/{userId}", response_model=dict, 
               description="Elimina un usuario por su ID. Solo accesible por usuarios con rol ADMIN.",
               dependencies=[Depends(authorizeRoles([Role.ADMIN]))])
@inject
async def deleteUserById(userId: int, 
                         userService: UserService = Depends(Provide[Container.userService])):
    is_deleted = userService.deleteById(userId)
    return {"is_deleted": is_deleted}

# Obtener información del usuario actual (accesible por USER y ADMIN)
@router.get("/me", response_model=UserResponse,
             description="Obtiene la información del usuario autenticado. Accesible por ADMIN y MEDIC.",
               dependencies=[Depends(authorizeRoles([Role.MEDIC, Role.ADMIN]))])
@inject
async def getMyUser(authenticatedUser: User = Depends(getAuthenticatedUser)):
    return UserMapper.modelToResponse(authenticatedUser)

# Actualizar información del usuario actual (accesible por USER , ADMIN Y MEDIC)
@router.put("/me", response_model=UserResponse, 
            description="Actualiza el nombre del usuario autenticado. Accesible por PATIENT, ADMIN y MEDIC.",
            dependencies=[Depends(authorizeRoles([Role.PATIENT, Role.ADMIN, Role.MEDIC]))])
@inject
async def updateMyUser(request: UpdateUserRequest, 
                       authenticatedUser: User = Depends(getAuthenticatedUser), 
                       userService: UserService = Depends(Provide[Container.userService])):
    user = userService.updateById(authenticatedUser.id, request.full_name)
    return UserMapper.modelToResponse(user)

# Actualizar password del usuario actual (accesible por PATIENT, ADMIN Y MEDIC)
@router.put("/my-password", response_model=UserResponse, 
                description="Actualiza la contraseña del usuario autenticado. Accesible por PATIENT, ADMIN y MEDIC.",
                dependencies=[Depends(authorizeRoles([Role.PATIENT, Role.ADMIN, Role.MEDIC]))])
@inject
async def updateMyPassword(request: UpdatePasswordRequest, 
                           authenticatedUser: User = Depends(getAuthenticatedUser), 
                           userService: UserService = Depends(Provide[Container.userService])):
    user = userService.updatePasswordById(authenticatedUser.id, request.password)
    return UserMapper.modelToResponse(user)

# Eliminar usuario actual (accesible por USER y ADMIN)
@router.delete("/me", response_model=dict, 
               description="Elimina la cuenta del usuario autenticado. Accesible por PATIENT y ADMIN.",
               dependencies=[Depends(authorizeRoles([Role.PATIENT, Role.ADMIN]))])
@inject
async def deleteMyUser(authenticatedUser: User = Depends(getAuthenticatedUser), 
                       userService: UserService = Depends(Provide[Container.userService])):
    isDeleted = userService.deleteById(authenticatedUser.id)
    return {"is_deleted": isDeleted}