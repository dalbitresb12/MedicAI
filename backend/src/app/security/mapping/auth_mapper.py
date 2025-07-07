from app.security.schemas.request.register_user_request import (
    RegisterUserRequest,
)
from app.security.schemas.response.auth_response import AuthResponse
from app.security.domain.model.user import User
from app.security.mapping.user_mapper import UserMapper
from app.security.service.auth_service import pwd_context


class AuthMapper:
    @staticmethod
    def registerRequestToModel(request: RegisterUserRequest) -> User:
        return User(
            username=request.username,
            email=request.email,
            full_name=request.full_name,
            hashed_password=pwd_context.hash(request.password),
        )

    @staticmethod
    def ModelToResponseWithToken(user: User, accessToken: str) -> AuthResponse:
        userResponse = UserMapper.modelToResponse(user)
        return AuthResponse(
            access_token=accessToken,
            token_type="bearer",
            userResponse=userResponse,
        )
