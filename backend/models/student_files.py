from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)
from datetime import datetime

from sqlalchemy.orm import relationship
from database.connection import Base

class StudentFile(Base):

    __tablename__ = "student_files"

    file_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    uploaded_by = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False
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
        default=datetime.utcnow
    )

    user = relationship(
        "User",
        back_populates="student_files"
    )

    fetch_jobs = relationship(
        "FetchJob",
        back_populates="student_file"
    )

    records = relationship(
        "StudentFileRecord",
        back_populates="student_file"
    )
