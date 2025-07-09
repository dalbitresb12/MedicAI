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

```bash
git clone https://github.com/dalbitresb12/MedicAI.git
cd MedicAI/backend
```

### Comandos para ejecutar el backend

## Generar entorno virtual e instalar dependencias

```bash
uv sync
```

## Crear copia del archivo .env.example de la carpeta raíz del repositorio y ajustar variables

```bash
# Asume que se encuentra en /path/to/repo/backend
cp ../.env.example .env
# Abrir el archivo en su editor de preferencia
```

### Bash

```bash
export PYTHONPATH="src"
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### PowerShell

```pwsh
$env:PYTHONPATH = "src"
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
