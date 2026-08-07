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

# User
user = User(
    full_name="Administrator",
    email="admin@gmail.com",
    password_hash="admin123",
    role="admin"
)

db.add(user)
db.commit()

# Student file
student_file = StudentFile(
    uploaded_by=user.user_id,
    file_name="BCA_4th_Sem.xlsx",
    original_file_name="BCA_4th_Sem.xlsx",
    file_type="xlsx",
    total_students=2
)

db.add(student_file)
db.commit()

# Student records
student1 = StudentFileRecord(
    file_id=student_file.file_id,
    symbol_no="2301001",
    registration_no="PU001",
    student_name="Ram Sharma",
    faculty="Science",
    program="BCA",
    semester=4,
    username="2301001",
    password="ram123"
)

student2 = StudentFileRecord(
    file_id=student_file.file_id,
    symbol_no="2301002",
    registration_no="PU002",
    student_name="Sita Karki",
    faculty="Science",
    program="BCA",
    semester=4,
    username="2301002",
    password="sita123"
)

db.add_all([student1, student2])
db.commit()

# Fetch job
job = FetchJob(
    file_id=student_file.file_id,
    job_status="Completed",
    total_records=2,
    processed_records=2
)

db.add(job)
db.commit()

# Fetch job items
item1 = FetchJobItem(
    job_id=job.job_id,
    record_id=student1.record_id,
    fetch_status="Success"
)

item2 = FetchJobItem(
    job_id=job.job_id,
    record_id=student2.record_id,
    fetch_status="Success"
)

db.add_all([item1, item2])
db.commit()

# Results
result1 = Result(
    record_id=student1.record_id,
    exam_year=2026,
    semester=4,
    gpa=3.75,
    cgpa=3.75,
    result_status="Pass"
)

result2 = Result(
    record_id=student2.record_id,
    exam_year=2026,
    semester=4,
    gpa=3.42,
    cgpa=3.42,
    result_status="Pass"
)

db.add_all([result1, result2])
db.commit()

# Subject result
subject = SubjectResult(
    result_id=result1.result_id,
    subject_code="BCA401",
    subject_name="Database Management System",
    credit_hours=3,
    internal_marks=25,
    external_marks=55,
    total_marks=80,
    grade="A-",
    grade_point=3.7,
    result_status="Pass"
)

db.add(subject)
db.commit()

# Semester analysis
analysis = SemesterAnalysis(
    semester=4,
    exam_year=2026,
    total_students=2,
    passed_students=2,
    failed_students=0,
    highest_gpa=3.75,
    lowest_gpa=3.42,
    average_gpa=3.59
)

db.add(analysis)

# Activity log
log = ActivityLog(
    user_id=user.user_id,
    activity="Upload File",
    details="Admin uploaded BCA 4th Semester Excel file."
)

db.add(log)

db.commit()

print("Sample data inserted successfully!")

db.close()