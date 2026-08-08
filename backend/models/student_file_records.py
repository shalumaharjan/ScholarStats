from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database.connection import Base

class StudentFileRecord(Base):

    __tablename__ = "student_file_records"

    record_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    file_id = Column(
        Integer,
        ForeignKey(
            "student_files.file_id",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    crn = Column(
        String(30),
        nullable=False,
        index=True
    )

    ern = Column(
        String(30),
        index=True
    )

    registration_no = Column(
        String(50),
        index=True
    )

    student_name = Column(
        String(150),
        nullable=False
    )

    dob = Column(
        String(20),
        nullable=False
    )

    faculty = Column(
        String(100)
    )

    program = Column(
        String(100)
    )

    semester = Column(
        Integer
    )

    # username = Column(
    #     String(100)
    # )

    # password = Column(
    #     String(255)
    # )

    processing_status = Column(
        String(30),
        default="Pending"
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    student_file = relationship(
        "StudentFile",
        back_populates="records"
    )

    fetch_job_items = relationship(
        "FetchJobItem",
        back_populates="record"
    )

    results = relationship(
        "Result",
        back_populates="record"
    )