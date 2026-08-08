from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey
)

from sqlalchemy.orm import relationship
from database.connection import Base

class SubjectResult(Base):

    __tablename__ = "subject_results"

    subject_result_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    result_id = Column(
        Integer,
        ForeignKey(
            "results.result_id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    subject_code = Column(
        String(20)
    )

    subject_name = Column(
        String(150)
    )

    credit_hours = Column(
        Float
    )

    internal_marks = Column(
        Float
    )

    external_marks = Column(
        Float
    )

    total_marks = Column(
        Float
    )

    grade = Column(
        String(5)
    )

    grade_point = Column(
        Float
    )

    result_status = Column(
        String(20)
    )

    result = relationship(
        "Result",
        back_populates="subject_results"
    )
