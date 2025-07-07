from collections.abc import Sequence
from typing import Generic, TypeVar

from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, SQLModel, select

T = TypeVar("T", bound=SQLModel)


class BaseRepository(Generic[T]):
    def __init__(self, model: type[T], session: Session):
        self.model = model
        self.session = session

    def findById(self, id: int) -> T | None:
        return self.session.get(self.model, id)

    def findAll(self) -> Sequence[T]:
        statement = select(self.model)
        return self.session.exec(statement).all()

    def save(self, obj: T) -> T:
        try:
            self.session.add(obj)
            self.session.commit()
            self.session.refresh(obj)
            return obj
        except IntegrityError as e:
            self.session.rollback()
            raise ValueError(self._parseIntegrityError(e))

    def deleteById(self, id: int) -> None:
        obj = self.session.get(self.model, id)
        if obj:
            self.session.delete(obj)
            self.session.commit()

    @staticmethod
    def _parseIntegrityError(error: IntegrityError) -> str:
        orig_msg = str(error.orig)
        err_msg = orig_msg.split(":")[-1].replace("\n", "").strip()

        parts = err_msg.split(".")
        if len(parts) >= 2:
            table, column = parts[-2], parts[-1]
            return f"Duplicate entry for {column} in {table}. Please choose a different value."
        else:
            return "An error occurred while processing your request."
