from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
import os

from sqlalchemy.orm import Session

from database.connection import get_db
from models.result_files import ResultFile

from models.result_files import ResultFile
from models.fetch_jobs import FetchJob
from models.student_files import StudentFile

router = APIRouter(
    prefix="/api/result-files",
    tags=["Result Files"]
)

@router.get("")
def get_result_files(
    db: Session = Depends(get_db)
):
    files = (
        db.query(
            ResultFile,
            FetchJob,
            StudentFile
        )
        .join(
            FetchJob,
            ResultFile.job_id == FetchJob.job_id
        )
        .join(
            StudentFile,
            FetchJob.file_id == StudentFile.file_id
        )
        .order_by(
            ResultFile.created_at.desc()
        )
        .all()
    )
    result = []

    for result_file, job, student_file in files:
        result.append({
            "id": result_file.result_file_id,
            "fileName":
                result_file.file_name,
            "program":
                student_file.program,
            "semester":
                student_file.semester,
            "academicYear":
                student_file.academic_year,
            "session":
                student_file.academic_session,
            "students":
                result_file.total_students,
            "status":
                result_file.status,
            "generatedDate":
                result_file.created_at
        })
    return result


@router.get("/{result_file_id}/download")
def download_result_file(
    result_file_id: int,
    db: Session = Depends(get_db)
):
    result_file = (
        db.query(ResultFile)
        .filter(ResultFile.result_file_id == result_file_id)
        .first()
    )

    if not result_file:
        raise HTTPException(
            status_code=404,
            detail="Result file not found"
        )

    if not os.path.exists(result_file.file_path):
        raise HTTPException(
            status_code=404,
            detail="File does not exist"
        )

    return FileResponse(
        path=result_file.file_path,
        filename=result_file.file_name,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

@router.delete("/{result_file_id}")
def delete_result_file(
    result_file_id:int,
    db:Session=Depends(get_db)
):
    result_file = db.query(ResultFile).filter(
        ResultFile.result_file_id == result_file_id
    ).first()
    if not result_file:
        raise HTTPException(
            status_code=404,
            detail="Result file not found"
        )
    if os.path.exists(result_file.file_path):
        os.remove(result_file.file_path)
    db.delete(result_file)
    db.commit()
    return {
        "message":"Result file deleted successfully"
    }

