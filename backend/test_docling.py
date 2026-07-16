from docling.document_converter import DocumentConverter

converter = DocumentConverter()

file_path = "uploads/student_result.pdf"

result = converter.convert(file_path)

document = result.document

print("========== DOCX/PDF TEXT ==========")

print(document.export_to_markdown())