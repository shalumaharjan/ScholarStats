from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, distinct

from database.connection import SessionLocal

from models.student_file_records import StudentFileRecord
from models.student_files import StudentFile
from models.result_files import ResultFile
from models.fetch_jobs import FetchJob
from services.analysis_service import analyze_students

import os
import pandas as pd


router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    # ---------------------------------
    # Total Students
    # ---------------------------------
    total_students = (
        db.query(
            func.count(
                distinct(StudentFileRecord.ern)
            )
        )
        .filter(
            StudentFileRecord.ern.isnot(None)
        )
        .scalar()
        or 0
    )

    # ---------------------------------
    # Semesters Tracked
    # ---------------------------------
    semesters_tracked = (
        db.query(
            func.count(
                distinct(StudentFile.semester)
            )
        )
        .filter(
            StudentFile.semester.isnot(None)
        )
        .scalar()
        or 0
    )

    # ---------------------------------
    # Result Files
    # ---------------------------------
    result_files = (
        db.query(ResultFile)
        .count()
    )

    # ---------------------------------
    # Fetch Jobs
    # ---------------------------------
    fetch_jobs = (
        db.query(FetchJob)
        .count()
    )

    # ---------------------------------
    # Average Pass Rate + Backlogs
    # ---------------------------------
    
    completed_result_files = (
        db.query(ResultFile)
        .filter(ResultFile.status == "Completed")
        .all()
    )
    total_analyzed_students = 0
    total_passed_students = 0
    total_backlogs = 0
    for result_file in completed_result_files:
        file_path = os.path.join(
            BASE_DIR,
            result_file.file_path
        )
        if not os.path.exists(file_path):
            continue
        try:
            df = pd.read_excel(file_path)
            _, summary = analyze_students(df)
            total_analyzed_students += (
                summary["total_students"]
            )
            total_passed_students += (
                summary["passed_students"]
            )
            total_backlogs += (
                summary["failed_students"]
            )

        except Exception as error:
            print(
                f"Dashboard analysis skipped "
                f"{result_file.file_name}: {error}"
            )

    average_pass_rate = ( total_passed_students/ total_analyzed_students* 100
        if total_analyzed_students > 0
        else 0
    )

    return {
        "total_students": total_students,
        "semesters_tracked": semesters_tracked,
        "result_files": result_files,
        "fetch_jobs": fetch_jobs,
        "average_pass_rate": round(
            average_pass_rate,
            2
        ),
        "total_backlogs": total_backlogs,
    }

# ---------------------------------
# Semester-wise Pass Percentage
# ---------------------------------
@router.get("/semester-performance")
def get_semester_performance(
    db: Session = Depends(get_db)
):
    completed_result_files = (
        db.query(ResultFile)
        .filter(ResultFile.status == "Completed")
        .all()
    )

    semester_data = {}

    for result_file in completed_result_files:
        fetch_job = result_file.fetch_job

        if not fetch_job:
            continue
        student_file = fetch_job.student_file

        if not student_file:
            continue
        semester = student_file.semester

        if semester is None:
            continue
        file_path = os.path.join(
            BASE_DIR,
            result_file.file_path
        )

        if not os.path.exists(file_path):
            continue
        try:
            df = pd.read_excel(file_path)
            _, summary = analyze_students(df)
            if semester not in semester_data:
                semester_data[semester] = {
                    "total_students": 0,
                    "passed_students": 0,
                }

            semester_data[semester][
                "total_students"
            ] += summary["total_students"]

            semester_data[semester][
                "passed_students"
            ] += summary["passed_students"]

        except Exception as error:
            print(
                f"Semester performance skipped "
                f"{result_file.file_name}: {error}"
            )

    performance = []
    for semester in sorted(semester_data):
        data = semester_data[semester]

        total = data["total_students"]
        passed = data["passed_students"]

        pass_rate = (
            passed / total * 100
            if total > 0
            else 0
        )

        # 1st, 2nd, 3rd, 4th...
        if semester == 1:
            suffix = "st"
        elif semester == 2:
            suffix = "nd"
        elif semester == 3:
            suffix = "rd"
        else:
            suffix = "th"

        performance.append({
            "semester": f"{semester}{suffix} Sem",
            "passRate": round(pass_rate, 2),
        })

    return performance


@router.get("/overview")
def get_dashboard_overview(
    db: Session = Depends(get_db)
):
    latest_file = (
        db.query(StudentFile)
        .order_by(StudentFile.uploaded_at.desc())
        .first()
    )

    semesters_tracked = (
        db.query(
            func.count(
                distinct(StudentFile.semester)
            )
        )
        .filter(
            StudentFile.semester.isnot(None)
        )
        .scalar()
        or 0
    )

    if not latest_file:
        return {
            "program": "",
            "academic_year": "",
            "semesters_tracked": 0,
            "last_updated": None,
        }

    return {
        "program": latest_file.program,
        "academic_year": latest_file.academic_year,
        "semesters_tracked": semesters_tracked,
        "last_updated": latest_file.uploaded_at,
    }


@router.get("/recent-activities")
def get_recent_activities(
    db: Session = Depends(get_db)
):
    activities = []

    # ---------------------------------
    # Student file uploads
    # ---------------------------------
    student_files = (
        db.query(StudentFile)
        .order_by(StudentFile.uploaded_at.desc())
        .limit(5)
        .all()
    )

    for file in student_files:
        activities.append({
            "type": "upload",
            "activity": f"{file.file_name} uploaded",
            "status": file.upload_status or "Uploaded",
            "timestamp": file.uploaded_at,
        })

    # ---------------------------------
    # Fetch jobs
    # ---------------------------------
    fetch_jobs = (
        db.query(FetchJob)
        .order_by(FetchJob.created_at.desc())
        .limit(5)
        .all()
    )

    for job in fetch_jobs:
        student_file = job.student_file

        file_name = (
            student_file.file_name
            if student_file
            else "Student file"
        )

        activities.append({
            "type": "fetch",
            "activity": f"Result fetch for {file_name}",
            "status": job.job_status or "Pending",
            "timestamp": (
                job.completed_at
                or job.started_at
                or job.created_at
            ),
        })

    # ---------------------------------
    # Generated result files
    # ---------------------------------
    result_files = (
        db.query(ResultFile)
        .order_by(ResultFile.created_at.desc())
        .limit(5)
        .all()
    )

    for result in result_files:
        activities.append({
            "type": "result",
            "activity": f"{result.file_name} generated",
            "status": result.status or "Completed",
            "timestamp": result.created_at,
        })

    # ---------------------------------
    # Sort newest first
    # ---------------------------------
    activities = sorted(
        activities,
        key=lambda item: (
            item["timestamp"]
            if item["timestamp"]
            else datetime.min
        ),
        reverse=True
    )

    # Show latest 5 activities
    return activities[:5]