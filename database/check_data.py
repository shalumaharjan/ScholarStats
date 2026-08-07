from database import SessionLocal

from models import (
    User,
    StudentFile,
    StudentFileRecord,
    FetchJob,
    FetchJobItem,
    Result,
    SubjectResult,
    SemesterAnalysis,
    ActivityLog
)


db = SessionLocal()


print("\n========== USERS ==========")

users = db.query(User).all()

for user in users:
    print(
        user.user_id,
        user.full_name,
        user.email,
        user.role
    )


print("\n========== STUDENT FILES ==========")

files = db.query(StudentFile).all()

for file in files:
    print(
        file.file_id,
        file.file_name,
        file.upload_status
    )


print("\n========== STUDENT RECORDS ==========")

records = db.query(StudentFileRecord).all()

for record in records:
    print(
        record.record_id,
        record.symbol_no,
        record.student_name,
        record.program,
        record.semester
    )


print("\n========== FETCH JOBS ==========")

jobs = db.query(FetchJob).all()

for job in jobs:
    print(
        job.job_id,
        job.job_status,
        job.total_records,
        job.processed_records
    )


print("\n========== FETCH JOB ITEMS ==========")

items = db.query(FetchJobItem).all()

for item in items:
    print(
        item.item_id,
        item.fetch_status
    )


print("\n========== RESULTS ==========")

results = db.query(Result).all()

for result in results:
    print(
        result.result_id,
        result.exam_year,
        result.semester,
        result.gpa,
        result.cgpa,
        result.result_status
    )


print("\n========== SUBJECT RESULTS ==========")

subject_results = db.query(SubjectResult).all()

for subject in subject_results:
    print(
        subject.subject_code,
        subject.subject_name,
        subject.total_marks,
        subject.grade
    )


print("\n========== SEMESTER ANALYSIS ==========")

analyses = db.query(SemesterAnalysis).all()

for analysis in analyses:
    print(
        analysis.semester,
        analysis.exam_year,
        analysis.average_gpa
    )


print("\n========== ACTIVITY LOGS ==========")

logs = db.query(ActivityLog).all()

for log in logs:
    print(
        log.log_id,
        log.activity,
        log.ip_address
    )


db.close()