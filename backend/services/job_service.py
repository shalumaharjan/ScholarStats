from sqlalchemy.orm import Session
from datetime import datetime, timezone

from models.fetch_jobs import FetchJob
from models.fetch_job_item import FetchJobItem
from models.student_file_records import StudentFileRecord
from services.fetch_results import HeadlessResultChecker


def create_fetch_job(data, db: Session):
    fetch_job = FetchJob(
        file_id=data.studentFileId,
        job_status="Pending"
    )
    db.add(fetch_job)
    db.flush()

    students = (
        db.query(StudentFileRecord)
        .filter(StudentFileRecord.file_id == data.studentFileId)
        .all()
    )

    for student in students:
        item = FetchJobItem(
            job_id=fetch_job.job_id,
            record_id=student.record_id,
            fetch_status="Pending"
        )
        db.add(item)

    fetch_job.total_records = len(students)
    db.commit()

    process_fetch_job(fetch_job.job_id, db)

    return {
        "success": True,
        "fetchJobId": fetch_job.job_id,
        "message": "Fetch job created and processed",
        "totalStudents": len(students)
    }


def process_fetch_job(job_id: int, db: Session):
    job = db.query(FetchJob).filter(FetchJob.job_id == job_id).first()
    items = db.query(FetchJobItem).filter(FetchJobItem.job_id == job_id).all()

    job.job_status = "Processing"
    job.started_at = datetime.now(timezone.utc)
    db.commit()

    checker = HeadlessResultChecker()
    processed = 0
    failed = 0

    try:
        for item in items:
            student = (
                db.query(StudentFileRecord)
                .filter(StudentFileRecord.record_id == item.record_id)
                .first()
            )

            student_data = {
                "symbol_no": student.ern,
                "dob": student.dob,
            }

            result = checker.check_result(student_data)

            if result["status"] == "success":
                item.fetch_status = "Success"
                item.error_message = None
            else:
                item.fetch_status = "Failed"
                item.error_message = result.get("message", "Fetch failed")
                failed += 1

            item.fetched_at = datetime.now(timezone.utc)
            item.retry_count = (item.retry_count or 0) + 1
            processed += 1

            db.add(item)
            db.commit()

    finally:
        checker.close()

    job.job_status = "Completed"
    job.processed_records = processed
    job.failed_records = failed
    job.completed_at = datetime.now(timezone.utc)
    db.commit()