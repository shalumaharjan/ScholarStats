from fastapi import APIRouter
from services.fetch_results import check_single_result

router = APIRouter()


@router.post("/fetch-result")
def fetch_result():
    student = {
        "symbol_no": "24530090",
        "dob": "03-14-2004"
    }

    result = check_single_result(student)

    return result