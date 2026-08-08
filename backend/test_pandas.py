from services.file_service import read_excel_files

from services.chart_service import (
    get_pass_fail_data,
    get_grade_data,
    grade_bar_chart
)


# ==========================================
# READ EXCEL
# ==========================================

df = read_excel_files()

print("\n==========================================")
print("ORIGINAL DATA")
print("==========================================")

print(df)


# ==========================================
# PASS VS FAIL
# ==========================================

pass_fail = get_pass_fail_data(df)

print("\n==========================================")
print("PASS VS FAIL DATA")
print("==========================================")

print(pass_fail)


# ==========================================
# GRADE-WISE DATA
# ==========================================

grade_data = get_grade_data(df)

print("\n==========================================")
print("GRADE-WISE DATA")
print("==========================================")

print(grade_data)


# ==========================================
# GRADE BAR CHART DATA
# ==========================================

grade_chart = grade_bar_chart(df)

print("\n==========================================")
print("GRADE BAR CHART DATA")
print("==========================================")

print(grade_chart)