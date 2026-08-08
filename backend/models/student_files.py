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

class StudentFile(Base):

    __tablename__ = "student_files"

    file_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    file_name = Column(
        String(255),
        nullable=False
    )

    original_file_name = Column(
        String(255)
    )

    file_type = Column(
        String(20)
    )

    total_students = Column(
        Integer,
        default=0
    )

    upload_status = Column(
        String(30),
        default="Uploaded"
    )

    uploaded_at = Column(
        DateTime,
        server_default=func.now()
    )

    program = Column(
        String(100)
    )

    academic_year = Column(
        String(20)
    )

    academic_session = Column(
        String(30)
    )

    semester = Column(
        Integer
    )

    records = relationship(
    "StudentFileRecord",
    back_populates="student_file",
    cascade="all, delete-orphan",
    passive_deletes=True
)

    fetch_jobs = relationship(
    "FetchJob",
    back_populates="student_file",
    cascade="all, delete-orphan",
    passive_deletes=True
)