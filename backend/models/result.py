from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Float,
    ForeignKey
)

from sqlalchemy.orm import relationship

from database.connection import Base

class Result(Base):

    __tablename__ = "results"

    result_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    record_id = Column(
        Integer,
        ForeignKey(
            "student_file_records.record_id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    exam_year = Column(
        Integer
    )

    semester = Column(
        Integer
    )

    gpa = Column(
        Float
    )

    cgpa = Column(
        Float
    )

    result_status = Column(
        String(20)
    )

    remarks = Column(
        String(255)
    )

    fetched_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    record = relationship(
        "StudentFileRecord",
        back_populates="results"
    )

    subject_results = relationship(
        "SubjectResult",
        back_populates="result"
    )
