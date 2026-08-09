import os
import pandas as pd

from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)
REPORT_DIR = os.path.join(
    BASE_DIR,
    "generated_reports"
)
os.makedirs(
    REPORT_DIR,
    exist_ok=True
)

def generate_official_result_pdf(result_file,report_data):
    batch = report_data.batch
    program = report_data.program
    semester = report_data.semester
    session = report_data.session
    verified_by = report_data.verifiedBy
    designation = report_data.designation
    # --------------------------------------------
    # Result Excel path
    # --------------------------------------------
    excel_path = os.path.join(
        BASE_DIR,
        result_file.file_path
    )
    if not os.path.exists(excel_path):
        raise FileNotFoundError(
            f"Result Excel file not found: {excel_path}"
        )

    df = pd.read_excel(excel_path)
    print("RESULT EXCEL COLUMNS:", df.columns.tolist())
    # --------------------------------------------
    # Detect subjects dynamically
    # --------------------------------------------
    ignore_columns = {
        "SN",
        "Student_ID",
        "Name",
        "Date of Birth",
        "DOB",
        "Date_of_Birth",
        "Exam Roll No",
        "Exam_Roll_No",
        "ERN",
        "CRN",
        "Registration No.",
        "SGPA",
        "Grade",
        "Status",
        "Backlog Subjects",
    }
    subjects = [
        column
        for column in df.columns
        if column not in ignore_columns
    ]

    # --------------------------------------------
    # Output filename
    # --------------------------------------------
    base_name = os.path.splitext(
        result_file.file_name
    )[0]
    pdf_name = (
        f"{base_name}_Official_Result_Report.pdf"
    )
    pdf_path = os.path.join(
        REPORT_DIR,
        pdf_name
    )

    # --------------------------------------------
    # Create PDF
    # --------------------------------------------
    document = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        rightMargin=24,
        leftMargin=24,
        topMargin=12,
        bottomMargin=12,
    )

    styles = getSampleStyleSheet()

    college_style = ParagraphStyle(
        "CollegeTitle",
        parent=styles["Heading1"],
        fontName="Times-Bold",
        fontSize=12,
        leading=13,
        alignment=TA_CENTER,
        spaceAfter=1,
    )

    address_style = ParagraphStyle(
        "Address",
        parent=styles["Normal"],
        fontName="Times-Roman",
        fontSize=8,
        leading=9,
        alignment=TA_CENTER,
        spaceAfter=2,
    )

    report_title_style = ParagraphStyle(
        "ReportTitle",
        parent=styles["Heading2"],
        fontName="Times-Bold",
        fontSize=10,
        leading=11,
        alignment=TA_CENTER,
        spaceAfter=4,
    )

    normal_style = ParagraphStyle(
        "NormalReport",
        parent=styles["Normal"],
        fontName="Times-Roman",
        fontSize=8,
        leading=9,
        alignment=TA_LEFT,
    )

    elements = []
    # --------------------------------------------
    # Header
    # --------------------------------------------
    elements.append(
        Paragraph(
            "Nepal College of Information Technology",
            college_style
        )
    )
    elements.append(
        Paragraph(
            "Balkumari, Lalitpur",
            address_style
        )
    )
    elements.append(
        Paragraph(
            "Semester Result Report",
            report_title_style
        )
    )
    info_style = ParagraphStyle(
        "InfoStyle",
        parent=styles["Normal"],
        fontName="Times-Roman",
        fontSize=9,
        leading=12,
        alignment=TA_LEFT,
    )

    info_data = [
        [
            Paragraph(
                f"<b>Batch:</b> {batch}",
                info_style
            ),
            Paragraph(
                f"<b>Program:</b> {program}",
                info_style
            ),
        ],
        [
            Paragraph(
                f"<b>Semester:</b> {semester}",
                info_style
            ),
            Paragraph(
                f"<b>Academic Session:</b> {session}",
                info_style
            ),
        ],
    ]

    info_table = Table(
        info_data,
        colWidths=[200, 280]
    )

    info_table.hAlign = "CENTER"

    info_table.setStyle(
        TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, 0), 2),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 2),
        ])
    )

    elements.append(info_table)
    elements.append(Spacer(1, 6))

    # --------------------------------------------
    # Student Result Table
    # --------------------------------------------
    table_header_style = ParagraphStyle(
        "TableHeader",
        parent=styles["Normal"],
        fontName="Times-Bold",
        fontSize=6.5,
        leading=7,
        alignment=TA_CENTER,
    )
    headers = [
        Paragraph("SN", table_header_style),
        Paragraph("Student Name", table_header_style),
        Paragraph("Date of Birth", table_header_style),
        Paragraph("Exam Roll No.", table_header_style),
    ]

    for subject in subjects:
        headers.append(
            Paragraph(
                str(subject),
                table_header_style
            )
        )

    headers.append(
        Paragraph(
            "SGPA",
            table_header_style
        )
    )
    table_data = [headers]

    for index, row in df.iterrows():
        dob = ""
        if "Date of Birth" in df.columns:
            dob = row["Date of Birth"]
        elif "Date_of_Birth" in df.columns:
            dob = row["Date_of_Birth"]
        elif "DOB" in df.columns:
            dob = row["DOB"]
        else:
            dob = ""

        # Show only date, remove time
        if pd.notna(dob):
            if isinstance(dob, (pd.Timestamp, datetime)):
                dob = dob.strftime("%Y-%m-%d")
            else:
                dob = str(dob).split(" ")[0]
        else:
            dob = ""

        exam_roll = ""
        if "Exam Roll No" in df.columns:
            exam_roll = row["Exam Roll No"]
        elif "Exam_Roll_No" in df.columns:
            exam_roll = row["Exam_Roll_No"]
        elif "ERN" in df.columns:
            exam_roll = row["ERN"]

        student_row = [
            index + 1,
            str(row.get("Name", "")),
            str(dob),
            str(exam_roll),
        ]

        for subject in subjects:
            value = row.get(
                subject,
                ""
            )

            student_row.append(
                str(value)
            )
        sgpa = row.get(
            "SGPA",
            ""
        )
        student_row.append(
            str(sgpa)
        )
        table_data.append(
            student_row
        )
    # --------------------------------------------
    # Table column widths for A4 portrait
    # --------------------------------------------
    page_width = A4[0]

    # 24 left margin + 24 right margin
    usable_width = page_width - 48

    sn_width = 24
    dob_width = 55
    roll_width = 65
    sgpa_width = 38

    longest_name = max(
        len(str(name))
        for name in df["Name"]
    )

    name_width = min(
        max(95, longest_name * 4.2),
        135
    )

    remaining_width = (
        usable_width
        - sn_width
        - name_width
        - dob_width
        - roll_width
        - sgpa_width
    )

    subject_width = (
        remaining_width /
        max(len(subjects), 1)
    )

    column_widths = [
        sn_width,
        name_width,
        dob_width,
        roll_width,
        *([subject_width] * len(subjects)),
        sgpa_width,
    ]

    result_table = Table(
        table_data,
        colWidths=column_widths,
        repeatRows=1
    )

    result_table.hAlign = "CENTER"
    result_table.setStyle(
        TableStyle([
            ("TEXTCOLOR", (0, 0), (-1, -1), colors.black),

            ("FONTNAME", (0, 0), (-1, 0), "Times-Bold"),
            ("FONTNAME", (0, 1), (-1, -1), "Times-Roman"),

            ("FONTSIZE", (0, 0), (-1, 0), 8.5),
            ("FONTSIZE", (0, 1), (-1, -1), 8),

            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("ALIGN", (1, 1), (1, -1), "LEFT"),

            ("GRID", (0, 0), (-1, -1), 0.35, colors.black),

            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),

            ("TOPPADDING", (0, 0), (-1, -1), 1),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ("LEFTPADDING", (0, 0), (-1, -1), 1),
            ("RIGHTPADDING", (0, 0), (-1, -1), 1),
        ])
    )
    elements.append(
        result_table
    )
    elements.append(
        Spacer(1, 28)
    )

    # --------------------------------------------
    # Verification
    # --------------------------------------------
    verification_title_style = ParagraphStyle(
        "VerificationTitle",
        parent=styles["Normal"],
        fontName="Times-Bold",
        fontSize=11,
        leading=13,
        alignment=TA_CENTER,
    )

    verification_name_style = ParagraphStyle(
        "VerificationName",
        parent=styles["Normal"],
        fontName="Times-Bold",
        fontSize=9,
        leading=11,
        alignment=TA_CENTER,
    )

    verification_designation_style = ParagraphStyle(
        "VerificationDesignation",
        parent=styles["Normal"],
        fontName="Times-Roman",
        fontSize=8.5,
        leading=10,
        alignment=TA_CENTER,
    )

    date_style = ParagraphStyle(
        "DateStyle",
        parent=styles["Normal"],
        fontName="Times-Roman",
        fontSize=8.5,
        leading=10,
        alignment=TA_CENTER,
    )

    print_date = datetime.now().strftime(
        "%Y/%m/%d"
    )

    elements.append(
        Paragraph(
            "Verified By:",
            verification_title_style
        )
    )

    elements.append(
        Spacer(1, 5)
    )

    elements.append(
        Paragraph(
            verified_by,
            verification_name_style
        )
    )

    elements.append(
        Paragraph(
            designation,
            verification_designation_style
        )
    )

    elements.append(
        Spacer(1, 8)
    )

    elements.append(
        Paragraph(
            f"<b>DATE:</b> {print_date}",
            date_style
        )
    )

    # --------------------------------------------
    # Build PDF
    # --------------------------------------------

    document.build(
        elements
    )

    return pdf_path