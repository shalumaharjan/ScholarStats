from fastapi import APIRouter
from fastapi.responses import FileResponse

from services.file_service import read_excel_files
from services.analysis_service import analyze_students
from services.chart_service import create_all_charts


router = APIRouter(
    prefix="/api",
    tags=["Results"]
)


# =========================================================
# GET COMPLETE RESULTS
# =========================================================

@router.get("/results")
def get_results():

    df = read_excel_files()

    df, summary = analyze_students(df)

    students = df.to_dict(
        orient="records"
    )

    return {
        "summary": summary,
        "students": students
    }


# =========================================================
# GET BACKLOG STUDENTS
# =========================================================

@router.get("/results/backlogs")
def get_backlog_students():

    df = read_excel_files()

    df, summary = analyze_students(df)

    return {
        "backlog_students":
            summary["backlog_students"]
    }


# =========================================================
# GET HIGHEST MARKS
# =========================================================

@router.get("/results/highest")
def get_highest_marks():

    df = read_excel_files()

    df, summary = analyze_students(df)

    return {
        "highest_marks":
            summary["highest_marks"],

        "highest_overall":
            summary["highest_overall"]
    }


# =========================================================
# GET CHART INFORMATION
# =========================================================

@router.get("/charts")
def get_charts():

    df = read_excel_files()

    df, summary = analyze_students(df)

    charts = create_all_charts(df)

    return {
        "highest_marks": "/api/charts/highest-marks",

        "student_performance":
            "/api/charts/student-performance",

        "pass_fail":
            "/api/charts/pass-fail",

        "grade_distribution":
            "/api/charts/grade-distribution"
    }


# =========================================================
# HIGHEST MARKS CHART
# =========================================================

@router.get("/charts/highest-marks")
def highest_marks_chart():

    df = read_excel_files()

    df, summary = analyze_students(df)

    charts = create_all_charts(df)

    return FileResponse(
        charts["highest_marks"],
        media_type="image/png"
    )


# =========================================================
# STUDENT PERFORMANCE CHART
# =========================================================

@router.get("/charts/student-performance")
def student_performance_chart():

    df = read_excel_files()

    df, summary = analyze_students(df)

    charts = create_all_charts(df)

    return FileResponse(
        charts["student_performance"],
        media_type="image/png"
    )


# =========================================================
# PASS FAIL CHART
# =========================================================

@router.get("/charts/pass-fail")
def pass_fail_chart():

    df = read_excel_files()

    df, summary = analyze_students(df)

    charts = create_all_charts(df)

    return FileResponse(
        charts["pass_fail"],
        media_type="image/png"
    )


# =========================================================
# GRADE DISTRIBUTION CHART
# =========================================================

@router.get("/charts/grade-distribution")
def grade_distribution_chart():

    df = read_excel_files()

    df, summary = analyze_students(df)

    charts = create_all_charts(df)

    return FileResponse(
        charts["grade_distribution"],
        media_type="image/png"
    )