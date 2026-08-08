from fastapi import APIRouter

from services.file_service import read_excel_files
from services.analysis_service import analyze_students


router = APIRouter(
    prefix="/api/analysis",
    tags=["Analysis"]
)


@router.get("/results")
def get_analysis_results():

    # Read Excel files
    df = read_excel_files()

    # Check if data exists
    if df.empty:
        return {
            "message": "No Excel file found",
            "data": []
        }

    # Analyze students
    analyzed_df, summary = analyze_students(df)

    # Convert DataFrame to JSON
    students = analyzed_df.to_dict(
        orient="records"
    )

    return {
        "summary": summary,
        "students": students
    }