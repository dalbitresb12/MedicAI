from app.security.domain.model.user import User
from app.security.schemas.response.user_response import UserResponse
from app.security.service.auth_service import pwd_context

class UserMapper:                
    @staticmethod
    def modelToResponse(user: User) -> UserResponse:
        return UserResponse(id=user.id, 
                            username=user.username, 
                            email=user.email, 
                            full_name=user.full_name, 
                            enabled=user.enabled, 
                            role=user.role)