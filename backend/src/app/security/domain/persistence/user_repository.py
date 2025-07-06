from typing import Optional
from sqlmodel import Session, select
from app.security.domain.model.user import User
from app.core.base_repository import BaseRepository

class UserRepository(BaseRepository[User]):
    def __init__(self, session: Session):
        super().__init__(User, session)

    def findByUsername(self, username: str) -> Optional[User]:
        statement = select(User).where(User.username == username)
        return self.session.exec(statement).first()
        
    def findByEmail(self, email: str) -> Optional[User]:
        statement = select(User).where(User.email == email)
        return self.session.exec(statement).first()
