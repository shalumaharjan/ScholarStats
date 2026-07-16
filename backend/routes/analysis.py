from fastapi import APIRouter
from services.docling_service import extract_document
from services.parser_service import parse_markdown_table
from services.analysis_service import analyze_students
<<<<<<< HEAD

=======
>>>>>>> 7bb495c32c9a9e6a6b90c809ced05f42c8b09174

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)


@router.get("/")
def analyze():

    file_path = "uploads/student_result.xlsx"

    markdown = extract_document(file_path)

    students = parse_markdown_table(markdown)

    result = analyze_students(students)

    return result