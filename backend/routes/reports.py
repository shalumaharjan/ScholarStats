from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database.connection import get_db
from models.result_files import ResultFile
from schemas.report import OfficialReportRequest

from services.pdf_report_service import generate_official_result_pdf

router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"]
)

@router.post("/result/{file_id}/pdf")
def generate_result_pdf(
    file_id: int,
    report_data: OfficialReportRequest,
    db: Session = Depends(get_db)
):
    result_file = (
        db.query(ResultFile)
        .filter(
            ResultFile.result_file_id == file_id
        )
        .first()
    )
    if not result_file:
        raise HTTPException(
            status_code=404,
            detail="Result file not found"
        )
    pdf_path = generate_official_result_pdf(
        result_file,
        report_data
    )
    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename=f"{result_file.file_name.replace('.xlsx', '')}_Report.pdf"
    )