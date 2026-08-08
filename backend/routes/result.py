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
        "total_students": result["Total Students"],
        "passed_students": result["Passed Students"],
        "failed_students": result["Failed Students"],
        "average_percentage": result["Average Percentage"]
    }