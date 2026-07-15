from fastapi import APIRouter, UploadFile, File
import os

router = APIRouter(
    prefix="/api/student-files",
    tags=["Student Files"]
)

UPLOAD_FOLDER = "uploads"

# Create uploads folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    return {
        "filename": file.filename,
        "message": "File uploaded successfully"
    }


@router.get("")
def get_files():
    files = os.listdir(UPLOAD_FOLDER)

    return {
        "total_files": len(files),
        "files": files
    }