from fastapi import APIRouter

router = APIRouter(
    prefix="/api/fetch-jobs",
    tags=["Fetch Jobs"]
)

# Temporary in-memory storage
jobs = []


@router.post("")
def create_job():

    job = {
        "job_id": len(jobs) + 1,
        "status": "Pending"
    }

    jobs.append(job)

    return job


@router.get("")
def get_jobs():
    return jobs


@router.get("/{job_id}")
def get_job(job_id: int):

    for job in jobs:
        if job["job_id"] == job_id:
            return job

    return {
        "message": "Job not found"
    }