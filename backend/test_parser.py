from services.docling_service import extract_pdf_data
from services.parser_service import parse_student_table


pdf_file = "uploads/student_result.pdf"


# Step 1: PDF → Markdown
markdown = extract_pdf_data(pdf_file)


# Step 2: Markdown → JSON
students = parse_student_table(markdown)


print("FINAL JSON OUTPUT")
print(students)