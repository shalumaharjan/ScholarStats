from services.file_service import read_excel_files
from services.analysis_service import analyze_students

from services.chart_service import (
    pass_fail_chart,
    highest_overall_chart,
    highest_subject_chart
)


# ==========================================
# READ EXCEL FILES
# ==========================================

df = read_excel_files()

if df.empty:
    print("No Excel files found in uploads folder.")
    exit()


# ==========================================
# ANALYZE STUDENTS
# ==========================================

df, summary = analyze_students(df)


# ==========================================
# RESULT SUMMARY
# ==========================================

print("\n")
print("STUDENT RESULT ANALYSIS")
print("=" * 50)

print(f"Total Students     : {summary['total_students']}")
print(f"Passed Students    : {summary['passed_students']}")
print(f"Failed Students    : {summary['failed_students']}")
print(f"Average Percentage : {summary['average_percentage']}%")
print(f"Average SGPA       : {summary['average_sgpa']}")


# ==========================================
# HIGHEST SGPA
# ==========================================

print("\n")
print("HIGHEST SGPA")
print("=" * 50)

highest_sgpa = df["SGPA"].max()

top_students = df[
    df["SGPA"] == highest_sgpa
]

print(f"Highest SGPA : {highest_sgpa}")

for _, student in top_students.iterrows():

    print(
        f"Student ID : {student['Student_ID']} | "
        f"Name : {student['Name']} | "
        f"SGPA : {student['SGPA']}"
    )


# ==========================================
# HIGHEST MARKS IN EACH SUBJECT
# ==========================================

print("\n")
print("HIGHEST MARKS IN EACH SUBJECT")
print("=" * 50)

highest_subjects = highest_subject_chart(df)

for subject, data in highest_subjects.items():

    print(
        f"{subject} : "
        f"{data['marks']} "
        f"({data['student']})"
    )


# ==========================================
# STUDENT DETAILS
# ==========================================

print("\n")
print("STUDENT DETAILS")
print("=" * 50)

print(
    df.to_string(index=False)
)


# ==========================================
# CHARTS
# ==========================================

print("\n")
print("Opening charts...")

pass_fail_chart(df)

highest_overall_chart(df)

highest_subject_chart(df)