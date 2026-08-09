from pydantic import BaseModel

class FetchJobRequest(BaseModel):
    studentFileId: int
    resultType: str
    semester: str
    academicYear: str
    academicSession: str