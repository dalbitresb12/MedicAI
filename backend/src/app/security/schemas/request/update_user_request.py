from pydantic import BaseModel


class UpdateUserRequest(BaseModel):
    full_name: str
