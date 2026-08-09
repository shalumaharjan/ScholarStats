from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from database.connection import get_db
from models.result_files import ResultFile
import os
import pandas as pd

from services.analysis_service import analyze_students


router = APIRouter(
    prefix="/api/analysis",
    tags=["Analysis"]
)


# ============================================================
# COMPLETE ANALYSIS
# ============================================================

@router.get("/result-files/{file_id}")
def get_analysis_results(file_id:int,db:Session=Depends(get_db)):
    # Read Excel files
    result_file = (
        db.query(ResultFile)
        .filter(
            ResultFile.result_file_id == file_id
        )
        .first()
    )
    if not result_file:
        raise HTTPException(
            status_code=404,
            detail="Result file not found"
        )
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = os.path.join(
        BASE_DIR,
        result_file.file_path
    )
    df = pd.read_excel(file_path)

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

@router.get("/result-files/{file_id}/top-students")
def get_top_students(file_id:int,db:Session = Depends(get_db)):
    result_file = (
        db.query(ResultFile)
        .filter(
            ResultFile.result_file_id == file_id
        )
        .first()
    )
    if not result_file:
        raise HTTPException(
            status_code=404,
            detail="Result file not found"
        )

    df = pd.read_excel(
        result_file.file_path
    )
    analyzed_df, summary = analyze_students(df)

    top_students = (
        analyzed_df
        .sort_values(
            by="SGPA",
            ascending=False
        )
        .head(5)
    )
    students = []
    for _, student in top_students.iterrows():
        students.append({
            "student_id":
                int(student["Student_ID"]),
            "name":
                str(student["Name"]),
            "sgpa":
                float(student["SGPA"])
        })
    return {
        "top_students":students
    }


@router.get("/result-files/{file_id}/backlogs")
def get_backlogs(file_id:int,db:Session = Depends(get_db)):
    result_file = (
        db.query(ResultFile)
        .filter(
            ResultFile.result_file_id == file_id
        )
        .first()
    )
    if not result_file:
        raise HTTPException(
            status_code=404,
            detail="Result file not found"
        )
    df = pd.read_excel(
        result_file.file_path
    )
    analyzed_df, summary = analyze_students(df)
    return summary["backlog_students"]