from fastapi import APIRouter

from services.file_service import read_excel_files

from services.chart_service import (
    get_pass_fail_data,
    get_grade_data
)


router = APIRouter(
    prefix="/api/charts",
    tags=["Charts"]
)


# ==========================================
# PASS VS FAIL CHART API
# ==========================================

@router.get("/pass-fail")
def pass_fail_chart():

    df = read_excel_files()

    return get_pass_fail_data(df)


# ==========================================
# GRADE-WISE CHART API
# ==========================================

@router.get("/grades")
def grade_chart():

    df = read_excel_files()

    return get_grade_data(df)