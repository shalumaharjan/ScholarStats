from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from models.fetch_jobs import FetchJob
from models.fetch_job_item import FetchJobItem
from models.student_file_records import StudentFileRecord

router = APIRouter(
    prefix="/api/fetch-status",
    tags=["Fetch Status"]
)

@router.get("/latest")
def get_latest_fetch_status(db: Session = Depends(get_db)):
    latest_job = (
        db.query(FetchJob)
        .order_by(
            FetchJob.created_at.desc()
        )
        .first()
    )
    if not latest_job:
        raise HTTPException(
            status_code=404,
            detail="No fetch job found"
        )
    return get_fetch_status(
        latest_job.job_id,
        db
    )

@router.get("/{job_id}")
def get_fetch_status(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = (
        db.query(FetchJob)
        .filter(
            FetchJob.job_id == job_id
        )
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Fetch job not found"
        )

    items = (
        db.query(FetchJobItem)
        .filter(
            FetchJobItem.job_id == job_id
        )
        .all()
    )

    total = len(items)
    pending = len([
        item for item in items
        if item.fetch_status == "Pending"
    ])
    success = len([
        item for item in items
        if item.fetch_status == "Success"
    ])
    failed = len([
        item for item in items
        if item.fetch_status == "Failed"
    ])

    records = []

    for item in items:
        student = (
            db.query(StudentFileRecord)
            .filter(
                StudentFileRecord.record_id ==
                item.record_id
            )
            .first()
        )
        records.append({
            "id": item.item_id,

            "examRollNumber":
                student.ern,

            "studentName":
                student.student_name,

            "status":
                item.fetch_status,

            "message":
                item.error_message
                if item.error_message
                else "Waiting for fetch process",

            "attempt":
                item.retry_count,

            "fetchedAt":
                item.fetched_at
        })

    return {
    "job_id": job.job_id,
    "job_status": job.job_status,
    "file": {
        "file_name": job.student_file.original_file_name,
        "program": job.student_file.program,
        "semester": job.student_file.semester,
        "academic_year": job.student_file.academic_year,
        "academic_session": job.student_file.academic_session
    },
    "summary": {
        "total": total,
        "pending": pending,
        "success": success,
        "failed": failed
    },
    "records": records
}