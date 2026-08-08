from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship

from database.connection import Base

class FetchJobItem(Base):

    __tablename__ = "fetch_job_items"

    item_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    job_id = Column(
        Integer,
        ForeignKey(
            "fetch_jobs.job_id",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    record_id = Column(
        Integer,
        ForeignKey(
            "student_file_records.record_id",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    fetch_status = Column(
        String(30),
        default="Pending"
    )

    retry_count = Column(
        Integer,
        default=0
    )

    error_message = Column(
        Text
    )

    fetched_at = Column(
        DateTime
    )

    job = relationship(
        "FetchJob",
        back_populates="items"
    )

    record = relationship(
        "StudentFileRecord",
        back_populates="fetch_job_items"
    )
