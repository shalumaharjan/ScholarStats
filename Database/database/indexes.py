from sqlalchemy import Index

from database import engine
from models import (
    User,
    StudentFileRecord,
    FetchJob,
    Result,
    SubjectResult
)


indexes = [

    Index(
        "idx_users_email",
        User.email
    ),

    Index(
        "idx_student_symbol_no",
        StudentFileRecord.symbol_no
    ),

    Index(
        "idx_student_registration_no",
        StudentFileRecord.registration_no
    ),

    Index(
        "idx_fetch_job_status",
        FetchJob.job_status
    ),

    Index(
        "idx_result_record_id",
        Result.record_id
    ),

    Index(
        "idx_subject_code",
        SubjectResult.subject_code
    )
]


for index in indexes:
    index.create(
        bind=engine,
        checkfirst=True
    )


print("Database indexes created successfully!")