import logging

from app.core import constants


def get_logger(name: str | None = None) -> logging.Logger:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    if name is None:
        name = constants.APP_NAME
    return logging.getLogger(name)
