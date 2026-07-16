from services.file_service import read_excel

file_path = "uploads/student_result.xlsx"

df = read_excel(file_path)

print(df)