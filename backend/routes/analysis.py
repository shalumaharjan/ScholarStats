from fastapi import APIRouter

from services.file_service import read_excel_files
from services.analysis_service import analyze_students


router = APIRouter(
    prefix="/api/analysis",
    tags=["Analysis"]
)


# ============================================================
# COMPLETE ANALYSIS
# ============================================================

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


# ============================================================
# TOP 5 STUDENTS
# ============================================================

@router.get("/top-students")
def get_top_students():

    # Read Excel files
    df = read_excel_files()

    # Check if data exists
    if df.empty:
        return {
            "message": "No Excel file found",
            "top_students": []
        }

    # Analyze students
    analyzed_df, summary = analyze_students(df)

    # Sort by percentage and get first 5
    top_5 = (
        analyzed_df
        .sort_values(
            by="Percentage",
            ascending=False
        )
        .head(5)
    )

    # Prepare response
    students = []

    for _, student in top_5.iterrows():

        students.append({
            "student_id": int(
                student["Student_ID"]
            ),
            "name": str(
                student["Name"]
            ),
            "total": int(
                student["Total"]
            ),
            "percentage": float(
                student["Percentage"]
            ),
            "grade": str(
                student["Grade"]
            )
        })

    return {
        "top_students": students
    }