from docling.document_converter import DocumentConverter


def extract_document(file_path):

    converter = DocumentConverter()

    result = converter.convert(file_path)

    markdown = result.document.export_to_markdown()

    return markdown