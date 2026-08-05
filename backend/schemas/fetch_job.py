from pydantic import BaseModel

class FetchJobRequest(BaseModel):
    studentFileId: str
    resultType: str
    semester: str
    academicYear: str
    academicSession: str