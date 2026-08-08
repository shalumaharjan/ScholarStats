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

class ActivityLog(Base):

    __tablename__ = "activity_logs"

    log_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    user_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="SET NULL"
        ),
        nullable=True
    )

    activity = Column(
        String(255)
    )

    details = Column(
        Text
    )

    ip_address = Column(
        String(50)
    )

    log_time = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User",
        back_populates="activity_logs"
    )