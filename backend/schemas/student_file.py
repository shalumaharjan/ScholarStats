from pydantic import BaseModel


class FileResponse(BaseModel):
    filename: str
    message: str