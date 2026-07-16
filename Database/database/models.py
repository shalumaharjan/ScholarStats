from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    Float,
    ForeignKey
)

from sqlalchemy.orm import relationship

from database import Base


# =====================================================
# 1. USERS
# =====================================================

class User(Base):

    __tablename__ = "users"

    user_id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    full_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = Column(
        String(255),
        nullable=False
    )

    role = Column(
        String(20),
        default="admin"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    student_files = relationship(
        "StudentFile",
        back_populates="user"
    )

    activity_logs = relationship(
        "ActivityLog",
        back_populates="user"
    )


# =====================================================
# 2. STUDENT FILES
# =====================================================

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
            "users.user_id",
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

    records = relationship(
        "StudentFileRecord",
        back_populates="file"
    )

    fetch_jobs = relationship(
        "FetchJob",
        back_populates="file"
    )


# =====================================================
# 3. STUDENT FILE RECORDS
# =====================================================

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

    symbol_no = Column(
        String(30),
        unique=True,
        nullable=False,
        index=True
    )

    registration_no = Column(
        String(30),
        index=True
    )

    student_name = Column(
        String(150),
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

    username = Column(
        String(100)
    )

    password = Column(
        String(255)
    )

    processing_status = Column(
        String(30),
        default="Pending"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    file = relationship(
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


# =====================================================
# 4. FETCH JOBS
# =====================================================

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

    file = relationship(
        "StudentFile",
        back_populates="fetch_jobs"
    )

    items = relationship(
        "FetchJobItem",
        back_populates="job"
    )


# =====================================================
# 5. FETCH JOB ITEMS
# =====================================================

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


# =====================================================
# 6. RESULTS
# =====================================================

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


# =====================================================
# 7. SUBJECT RESULTS
# =====================================================

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


# =====================================================
# 8. SEMESTER ANALYSIS
# =====================================================

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


# =====================================================
# 9. ACTIVITY LOGS
# =====================================================

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
            "users.user_id",
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