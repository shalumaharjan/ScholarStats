from fastapi import APIRouter, UploadFile, File
import os

from services.docling_service import extract_document
from services.parser_service import parse_student_table


router = APIRouter(
    prefix="/api/student-files",
    tags=["Student Files"]
)


UPLOAD_FOLDER = "uploads"

# Create uploads folder if not exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)



@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # File save path
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )


    # Save uploaded file
    with open(file_path, "wb") as f:
        f.write(await file.read())


    # Step 1: Extract text/table using Docling
    text = extract_document(file_path)


    # Step 2: Convert extracted table into JSON
    data = parse_student_table(text)



    return {
        "filename": file.filename,
        "message": "File processed successfully",
        "result": data
    }




@router.get("")
def get_files():

    files = os.listdir(UPLOAD_FOLDER)

    return {
        "total_files": len(files),
        "files": files
    }