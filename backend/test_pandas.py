from services.file_service import read_excel_files
from services.analysis_service import analyze_students
from services.chart_service import (
    show_student_summary,
    show_highest_marks
)

# Read all Excel files
df = read_excel_files()

# Analyze data
result = analyze_students(df)

print("=" * 40)
print("STUDENT RESULT ANALYSIS")
print("=" * 40)

print(f"Total Students  : {result['Total Students']}")
print(f"Passed Students : {result['Passed Students']}")
print(f"Failed Students : {result['Failed Students']}")
print(f"Pass Percentage : {result['Pass Percentage']}%")
print(f"Fail Percentage : {result['Fail Percentage']}%")

print("\nHighest Marks in Each Subject")
print("-" * 40)

for subject, data in result["Highest Marks"].items():
    print(f"{subject:5} : {data['Highest Mark']} ({data['Student']})")

print("\nStudent Details")
print("-" * 40)

print(result["Student Details"])

# Show Charts
show_student_summary(result)
show_highest_marks(result)