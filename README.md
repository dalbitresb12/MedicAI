# 🏥 Backend - Sistema de Gestión Clínica (FastAPI + SQLModel + JWT)

Este es el backend de un sistema de gestión clínica desarrollado con **FastAPI**. Incluye autenticación y autorización por roles (ADMIN, MEDIC, PATIENT), envios de email (senders y listener), gestión de usuarios, médicos, citas médicas, historial clínico y carga de imágenes.

---

## 🚀 Características

- 🔐 Autenticación con JWT
- 👤 Gestión de usuarios y médicos
- 📅 Envio de notificaciones y archivos via email (SendGrid)
- 📅 Separación de citas médicas por fecha y hora
- 📁 Subida de foto de perfil de médicos
- 📄 Registro y consulta de historial clínico
- 🌐 Documentación Swagger automática
- 🧩 Arquitectura modular limpia estilo DDD

---

## 🧑‍💻 Tecnologías principales

- **FastAPI**
- **SQLModel**
- **Dependency Injector**
- **JWT (PyJWT)**
- **Uvicorn**
- **Pydantic**
- **PyProject con PEP 621**

---

## 📦 Requisitos previos

- Python 3.10+
- Git
- Tener configurado `uvicorn` y entorno virtual (opcional pero recomendado)

---

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio
bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio


### comandos para ejecutar el backend
- generar un entorno virtual
uv venv
source .venv/bin/activate     # En Windows: .venv\Scripts\activate



## instalar dependencias

uv pip install -e .



## Crear un archivo .env en la razi del proyecto con la imagen antes de ejecutar el backend

![image](https://github.com/user-attachments/assets/40a1e9e6-d506-41a3-a879-ae10d38d30ea)

```bash
###Inicio#################
# Versión de la API (útil para rutas y versionamiento)
API_VERSION=v1

# Activa/desactiva el modo de depuración
DEBUG_MODE=True

# Conexión a base de datos MySQL (ajusta según tus credenciales locales)
DATABASE_URL=mysql+mysqlconnector://root:password@localhost:3306/medical_ia

# Dominio frontend permitido para CORS
ORIGIN_URL=http://localhost:3000

# Usuario administrador inicial que se crea al iniciar la app por primera vez
INITIAL_ADMIN_USERNAME=admin
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_FULL_NAME=Admin User
INITIAL_ADMIN_PASSWORD=admin123

# Seguridad JWT
SECRET_KEY=supersecretkey             # Cambia esto por una clave segura
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Configuración de envío de correos (SendGrid)
SENDGRID_API_KEY=SG.XXX...            # Tu API Key de SendGrid
EMAIL_SENDER=name@example.com   # Email desde el cual se enviarán notificaciones puede ser tu email o tu dominio DNs
###fin del .env################

## ejecutar el backend con los siguientes commandos
# En Linux/macOS
export PYTHONPATH=src
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# En PowerShell (Windows)
$env:PYTHONPATH = "src"
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload



