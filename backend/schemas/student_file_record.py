from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class StudentFileRecordBase(BaseModel):

    crn: str
    ern: Optional[str] = None
    registration_no: Optional[str] = None

    student_name: str

    dob: Optional[str] = None

    faculty: Optional[str] = None
    program: Optional[str] = None
    semester: Optional[int] = None

    username: Optional[str] = None
    password: Optional[str] = None

    processing_status: Optional[str] = "Pending"


class StudentFileRecordResponse(StudentFileRecordBase):

    record_id: int
    file_id: int
    created_at: datetime

    class Config:
        from_attributes = True