# Exam Automation Database

This project contains the database system for the Exam Automation System.

## Technology Used

- Python
- SQLAlchemy
- SQLite

## Database Name

exam_automation.db

## Database Tables

The database contains the following tables:

1. users
2. student_files
3. student_file_records
4. fetch_jobs
5. fetch_job_items
6. results
7. subject_results
8. semester_analysis
9. activity_logs

## Table Relationships

### users → student_files

One user can upload multiple student files.

### student_files → student_file_records

One student file can contain multiple student records.

### student_files → fetch_jobs

One student file can have multiple fetch jobs.

### fetch_jobs → fetch_job_items

One fetch job can contain multiple fetch job items.

### student_file_records → results

One student record can have result information.

### results → subject_results

One result can contain multiple subject results.

### users → activity_logs

One user can generate multiple activity logs.

## Project Files

```text
database/
│
├── database.py
├── models.py
├── create_database.py
├── seed.py
├── check_tables.py
├── check_data.py
├── indexes.py
├── backup_database.py
└── exam_automation.db