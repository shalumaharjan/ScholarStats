from services.docling_service import extract_document
from services.parser_service import parse_markdown_table
from services.analysis_service import analyze_students

file_path = "uploads/student_result.xlsx"

markdown = extract_document(file_path)

students = parse_markdown_table(markdown)

result = analyze_students(students)

print(result)