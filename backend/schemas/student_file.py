from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class FileResponse(BaseModel):

    file_id: int
    filename: str
    original_filename: str
    file_type: str
    total_students: int
    upload_status: str
    uploaded_at: datetime
    message: str

    class Config:
        from_attributes = True