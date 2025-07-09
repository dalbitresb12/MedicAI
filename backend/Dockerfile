FROM python:3.12-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

ENV UV_LINK_MODE=copy

COPY pyproject.toml uv.lock /app/

RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --locked --compile-bytecode --no-install-project

COPY . /app

RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --locked --compile-bytecode

EXPOSE 8000

RUN mkdir -p /mnt/static && mkdir -p /mnt/uploads

VOLUME [ "/mnt/static" ]
VOLUME [ "/mnt/uploads" ]

ENV PYTHONPATH=/app/src

CMD [ "uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000" ]
