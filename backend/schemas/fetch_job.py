from pydantic import BaseModel


class FetchJobResponse(BaseModel):
    job_id: int
    status: str