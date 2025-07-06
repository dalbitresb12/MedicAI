from sqlmodel import Session, create_engine
from contextlib import contextmanager
from app.core.config import settings

engine = create_engine(settings.database_url, echo=True)

@contextmanager
def getSession():
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()