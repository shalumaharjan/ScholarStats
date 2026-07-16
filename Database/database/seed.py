from datetime import datetime, UTC

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


try:

    # ==========================================
    # 1. USER
    # ==========================================

    user = db.query(User).filter(
        User.email == "admin@example.com"
    ).first()

    if not user:
        user = User(
            full_name="System Administrator",
            email="admin@example.com",
            password_hash="demo_password",
            role="admin"
        )

        db.add(user)
        db.flush()


    # ==========================================
    # 2. STUDENT FILE
    # ==========================================

    student_file = StudentFile(
        uploaded_by=user.user_id,
        file_name="students_2026.csv",
        original_file_name="students_2026.csv",
        file_type="CSV",
        total_students=1,
        upload_status="Uploaded"
    )

    db.add(student_file)
    db.flush()


    # ==========================================
    # 3. STUDENT FILE RECORD
    # ==========================================

    student_record = StudentFileRecord(
        file_id=student_file.file_id,
        symbol_no="123456",
        registration_no="REG2026001",
        student_name="Ram Sharma",
        faculty="Management",
        program="BCA",
        semester=4,
        username="ram123",
        password="demo_password",
        processing_status="Completed"
    )

    db.add(student_record)
    db.flush()


    # ==========================================
    # 4. FETCH JOB
    # ==========================================

    fetch_job = FetchJob(
        file_id=student_file.file_id,
        job_status="Completed",
        total_records=1,
        processed_records=1,
        failed_records=0,
        started_at=datetime.utcnow(),
        completed_at=datetime.utcnow()
    )

    db.add(fetch_job)
    db.flush()


    # ==========================================
    # 5. FETCH JOB ITEM
    # ==========================================

    fetch_item = FetchJobItem(
        job_id=fetch_job.job_id,
        record_id=student_record.record_id,
        fetch_status="Completed",
        retry_count=0,
        fetched_at=datetime.utcnow()
    )

    db.add(fetch_item)


    # ==========================================
    # 6. RESULT
    # ==========================================

    result = Result(
        record_id=student_record.record_id,
        exam_year=2026,
        semester=4,
        gpa=3.45,
        cgpa=3.32,
        result_status="Passed",
        remarks="Good performance"
    )

    db.add(result)
    db.flush()


    # ==========================================
    # 7. SUBJECT RESULT
    # ==========================================

    subject_result = SubjectResult(
        result_id=result.result_id,
        subject_code="DBMS401",
        subject_name="Database Management System",
        credit_hours=3,
        internal_marks=25,
        external_marks=60,
        total_marks=85,
        grade="A",
        grade_point=3.6,
        result_status="Passed"
    )

    db.add(subject_result)


    # ==========================================
    # 8. SEMESTER ANALYSIS
    # ==========================================

    semester_analysis = SemesterAnalysis(
        semester=4,
        exam_year=2026,
        total_students=1,
        passed_students=1,
        failed_students=0,
        highest_gpa=3.45,
        lowest_gpa=3.45,
        average_gpa=3.45
    )

    db.add(semester_analysis)


    # ==========================================
    # 9. ACTIVITY LOG
    # ==========================================

    activity_log = ActivityLog(
        user_id=user.user_id,
        activity="Sample data inserted",
        details="Sample student result data was added to the database.",
        ip_address="127.0.0.1"
    )

    db.add(activity_log)


    # Save all data
    db.commit()

    print("Sample data inserted successfully!")


except Exception as error:

    db.rollback()

    print("Error occurred:")
    print(error)


finally:

    db.close()