from services.docling_service import extract_pdf_data


file = "uploads/student_result.pdf"

data = extract_pdf_data(file)

print(data)