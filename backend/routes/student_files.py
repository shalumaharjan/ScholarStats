from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

import os
import uuid
import pandas as pd

from database.connection import get_db

from models.student_files import StudentFile
from models.student_file_records import StudentFileRecord

router = APIRouter(
    prefix="/api/student-files",
    tags=["Student Files"]
)

UPLOAD_FOLDER = "uploads/student_files"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    program: str = Form(...),
    academic_year: str = Form(...),
    academic_session: str = Form(...),
    semester: int = Form(...),
    db: Session = Depends(get_db)
):

    if not file.filename.endswith((".xlsx", ".xls")):
        raise HTTPException(
            status_code=400,
            detail="Only Excel files are allowed"
        )

    extension = os.path.splitext(file.filename)[1]
    stored_filename = f"{uuid.uuid4()}{extension}"
    file_path = os.path.join(UPLOAD_FOLDER, stored_filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    try:
        df = pd.read_excel(file_path, header=0)
        df.rename(
            columns={
                "DOB": "DD",
                "Unnamed: 6": "MM",
                "Unnamed: 7": "YYYY"
            },
            inplace=True
        )

        df = df.dropna(subset=["CRN"])

        student_file = StudentFile(
            file_name=stored_filename,
            original_file_name=file.filename,
            file_type=extension,
            total_students=len(df),
            upload_status="Uploaded",
            program=program,
            academic_year=academic_year,
            academic_session=academic_session,
            semester=semester
        )
        db.add(student_file)
        db.flush()

        for _, row in df.iterrows():
            dob = (
                f"{int(row['MM']):02d}/"
                f"{int(row['DD']):02d}/"
                f"{int(row['YYYY'])}"
            )

            student_record = StudentFileRecord(
                file_id=student_file.file_id,
                crn=str(int(row["CRN"])),
                ern=str(int(row["ERN"])),
                student_name=str(row["Name of the student"]),
                registration_no=str(row["Registration No."]),
                dob=dob,
                program=program,
                semester=semester,
                processing_status="Pending"
            )
            db.add(student_record)

        db.commit()

        return {
            "message": "Student file uploaded successfully",
            "file_id": student_file.file_id,
            "filename": file.filename,
            "total_students": len(df)
        }

    except Exception as e:
        db.rollback()
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("")
def get_files(db: Session = Depends(get_db)):
    files = (
        db.query(StudentFile)
        .order_by(StudentFile.uploaded_at.desc())
        .all()
    )
    return files


@router.get("/{file_id}/records")
def get_student_records(file_id: int, db: Session = Depends(get_db)):
    records = (
        db.query(StudentFileRecord)
        .filter(StudentFileRecord.file_id == file_id)
        .all()
    )
    return records


@router.delete("/{file_id}")
def delete_student_file(file_id: int, db: Session = Depends(get_db)):
    student_file = (
        db.query(StudentFile)
        .filter(StudentFile.file_id == file_id)
        .first()
    )

    if not student_file:
        raise HTTPException(status_code=404, detail="Student file not found")

    file_path = os.path.join(UPLOAD_FOLDER, student_file.file_name)

    try:
        db.delete(student_file)
        db.commit()
        if os.path.exists(file_path):
            os.remove(file_path)
        return {"message": "Student file deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))