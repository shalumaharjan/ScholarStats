from fastapi import APIRouter
from schemas.analysis import Student

router = APIRouter(
    prefix="/api/analysis",
    tags=["Analysis"]
)

students = []


@router.post("/run")
def run_analysis(student: Student):

    students.append(student)

    return {
        "message": "Student added successfully",
        "student": student
    }


@router.get("/summary")
def analysis_summary():

    total_students = len(students)

    passed = 0
    failed = 0
    total_gpa = 0

    for student in students:

        total_gpa += student.gpa

        if student.result.lower() == "pass":
            passed += 1
        else:
            failed += 1

    average_gpa = 0

    if total_students > 0:
        average_gpa = total_gpa / total_students

    pass_percentage = 0

    if total_students > 0:
        pass_percentage = (passed / total_students) * 100

    fail_percentage = 0

    if total_students > 0:
        fail_percentage = (failed / total_students) * 100

    return {
        "total_students": total_students,
        "passed": passed,
        "failed": failed,
        "average_gpa": round(average_gpa,2),
        "pass_percentage": round(pass_percentage,2),
        "fail_percentage": round(fail_percentage,2)
    }