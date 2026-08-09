from sqlalchemy.orm import Session

from models.fetch_jobs import FetchJob
from models.fetch_job_item import FetchJobItem
from models.student_file_records import StudentFileRecord

def create_fetch_job(data, db: Session):
    # Create Fetch Job
    fetch_job = FetchJob(
        file_id=data.studentFileId,
        job_status="Pending"
    )
    db.add(fetch_job)
    db.flush()

    # Get students from uploaded file
    students = (
        db.query(StudentFileRecord)
        .filter(
            StudentFileRecord.file_id == data.studentFileId
        )
        .all()
    )

    # Create Fetch Job Items
    for student in students:
        item = FetchJobItem(
            job_id=fetch_job.job_id,
            record_id=student.record_id,
            fetch_status="Pending"
        )
        db.add(item)

    # Update total students
    fetch_job.total_records = len(students)
    db.commit()

    return {
        "success": True,
        "fetchJobId": fetch_job.job_id,
        "message": "Fetch job created successfully",
        "totalStudents": len(students)
    }