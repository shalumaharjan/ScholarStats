from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schemas.fetch_job import FetchJobRequest
from services import job_service
from database.connection import get_db

router = APIRouter(tags=["Fetch Jobs"])

@router.post("/fetch-jobs")
def create_fetch_job(
    data: FetchJobRequest,
    db: Session = Depends(get_db)
):
    return job_service.create_fetch_job(
        data,
        db
    )