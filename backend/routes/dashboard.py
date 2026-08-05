from fastapi import APIRouter

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def dashboard_summary():

    return {
        "total_students": 120,
        "passed_students": 110,
        "failed_students": 10,
        "average_gpa": 3.42,
        "uploaded_files": 5,
        "analysis_jobs": 8
    }