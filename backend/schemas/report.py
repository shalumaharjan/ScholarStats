from pydantic import BaseModel


class OfficialReportRequest(BaseModel):
    batch: str
    program: str
    semester: str
    session: str
    verifiedBy: str
    designation: str