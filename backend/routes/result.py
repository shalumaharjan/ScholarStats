from fastapi import APIRouter
from services.result_service import fetch_multiple_results

router = APIRouter(prefix="/results", tags=["Results"])

@router.post("/fetch")
def fetch_results():
    students = [
        {
            "ern": "24530044",
            "dob": "12-01-2005",
            "exam_type": "Regular_Retake",
            "year": "2025",
            "session": "Fall",
            "semester": "3rd",
            "program": "Bachelor of Computer Application"
        }
    ]

    result = fetch_multiple_results(students)

    if result is None:
        return {"message": "No results found"}

    return result.to_dict(orient="records")