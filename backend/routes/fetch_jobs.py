from fastapi import APIRouter
from schemas.fetch_job import FetchJobRequest
from services import job_service

router = APIRouter(tags=["Fetch Jobs"])

@router.post("/fetch-jobs")
def create_fetch_job(data: FetchJobRequest):
    return job_service.create_fetch_job(data)