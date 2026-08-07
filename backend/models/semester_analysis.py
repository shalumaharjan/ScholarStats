from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    Float
)
from database.connection import Base

class SemesterAnalysis(Base):

    __tablename__ = "semester_analysis"

    analysis_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    semester = Column(
        Integer
    )

    exam_year = Column(
        Integer
    )

    total_students = Column(
        Integer
    )

    passed_students = Column(
        Integer
    )

    failed_students = Column(
        Integer
    )

    highest_gpa = Column(
        Float
    )

    lowest_gpa = Column(
        Float
    )

    average_gpa = Column(
        Float
    )

    generated_at = Column(
        DateTime,
        default=datetime.utcnow
    )
