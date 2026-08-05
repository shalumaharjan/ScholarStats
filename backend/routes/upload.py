from services.file_service import read_excel
from services.analysis_service import analyze_students

file_path = "uploads/student_result.xlsx"

df = read_excel(file_path)

df, summary = analyze_students(df)

print(df)

print("\nSummary:")
print(summary)