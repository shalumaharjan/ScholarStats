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

class ResultFile(Base):
    __tablename__ = "result_files"

    result_file_id = Column(
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

    file_name = Column(
        String(255),
        nullable=False
    )

    file_path = Column(
        String(500),
        nullable=False
    )

    total_students = Column(
        Integer,
        default=0
    )

    status = Column(
        String(30),
        default="Processing"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    fetch_job = relationship(
        "FetchJob",
        back_populates="result_file"
    )