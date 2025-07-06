from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from sqlmodel import SQLModel
from contextlib import asynccontextmanager


from app.security.api.auth_controller import router as AuthController
from app.security.api.user_controller import router as UserController
from app.api.appointment_controller import router as AppointmentController
from app.api.medic_controller import router as MedicController
from app.api.clinical_history_controller import router as ClinicalHistoryController

from app.core.database import engine
from app.core.config import settings
from app.core.container import Container
from app.core.default_data import defaultData

# Declara el contenedor globalmente, solo una vez
container = Container()
userRepository = container.userRepository()

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    defaultData(userRepository)

    # Aquí NO vuelvas a crear Container(), solo usa el global
    container.wire(modules=[
        "app.security.api.auth_controller",
        "app.security.api.user_controller",
        "app.api.appointment_controller",
        "app.crosscutting.authorization",
        "app.api.medic_controller",
        "app.api.clinical_history_controller",
    ])

    yield

def create_app():
    app = FastAPI(lifespan=lifespan)
    app.container = container  # ✅ Registrar el contenedor global
    app.include_router(AuthController)
    app.include_router(UserController)
    app.include_router(AppointmentController)
    app.include_router(MedicController)
    app.include_router(ClinicalHistoryController)
    app.mount("/static", StaticFiles(directory="static"), name="static")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app

app = create_app()

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")
