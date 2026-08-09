from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from database.connection import Base
from datetime import datetime


class FetchJob(Base):

    __tablename__ = "fetch_jobs"

    job_id = Column(
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

    job_status = Column(
        String(30),
        default="Pending",
        index=True
    )

    total_records = Column(
        Integer,
        default=0
    )

    processed_records = Column(
        Integer,
        default=0
    )

    failed_records = Column(
        Integer,
        default=0
    )

    started_at = Column(
        DateTime
    )

    completed_at = Column(
        DateTime
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    items = relationship(
    "FetchJobItem",
    back_populates="job",
    cascade="all, delete-orphan",
    passive_deletes=True
)

    student_file = relationship(
        "StudentFile",
        back_populates="fetch_jobs"
    )

    result_file = relationship(
        "ResultFile",
        back_populates="fetch_job",
        uselist=False
    )

