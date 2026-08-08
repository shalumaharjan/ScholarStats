from fastapi import APIRouter

from services.file_service import read_excel_files
from services.analysis_service import analyze_students


router = APIRouter(
    prefix="/api",
    tags=["Results"]
)


@router.get("/results")
def get_results():

    df = read_excel_files()

    result = analyze_students(df)

    return {
    "total_students": summary["total_students"],
    "passed_students": summary["passed_students"],
    "failed_students": summary["failed_students"],
    "average_percentage": summary["average_percentage"],
    "average_sgpa": summary["average_sgpa"],
    "students": df.to_dict(orient="records")
}