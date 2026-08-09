from services.file_service import read_excel_files
from services.analysis_service import analyze_students, calculate_grade
from services.chart_service import create_all_charts


def print_section(title):
    print()
    print("=" * 60)
    print(title)
    print("=" * 60)


# ============================================================
# READ EXCEL FILES
# ============================================================

df = read_excel_files()


# ============================================================
# ANALYZE STUDENT RESULTS
# ============================================================

student_df, summary = analyze_students(df)


# ============================================================
# STUDENT RESULT ANALYSIS
# ============================================================

print_section("STUDENT RESULT ANALYSIS")

print(f"Total Students  : {summary['total_students']}")
print(f"Passed Students : {summary['passed_students']}")
print(f"Failed Students : {summary['failed_students']}")
print(f"Pass Percentage : {summary['pass_percentage']:.2f}%")
print(f"Fail Percentage : {summary['fail_percentage']:.2f}%")


# ============================================================
# HIGHEST MARKS IN EACH SUBJECT
# ============================================================

print_section("HIGHEST MARKS IN EACH SUBJECT")

for subject, data in summary["highest_marks"].items():
    print(
        f"{subject:<5}: "
        f"{data['marks']} "
        f"({data['name']})"
    )


# ============================================================
# TOP 5 STUDENTS
# ============================================================

print_section("TOP 5 STUDENTS")

top_5 = (
    student_df
    .sort_values(
        by="Percentage",
        ascending=False
    )
    .head(5)
)

for rank, (_, student) in enumerate(
    top_5.iterrows(),
    start=1
):
    print()
    print(f"Rank {rank}")
    print(f"Student ID : {int(student['Student_ID'])}")
    print(f"Name       : {student['Name']}")
    print(f"Total      : {int(student['Total'])}")
    print(f"Percentage : {student['Percentage']:.2f}%")
    print(f"Grade      : {student['Grade']}")


# ============================================================
# STUDENT RESULT DATAFRAME
# ============================================================

print_section("STUDENT RESULT DATAFRAME")

display_df = student_df.copy()

# Remove backlog column from DataFrame display
if "Backlog Subjects" in display_df.columns:
    display_df = display_df.drop(
        columns=["Backlog Subjects"]
    )

print(
    display_df.to_string(index=False)
)


# ============================================================
# SUBJECT-WISE GRADE TABLE
# ============================================================

print_section("SUBJECT-WISE GRADE TABLE")

subjects = [
    "DSA",
    "WT",
    "OS",
    "OOP",
    "SAPM"
]

print(
    f"{'No.':<5}"
    f"{'Subject':<8}"
    f"{'A+':<5}"
    f"{'A':<5}"
    f"{'B+':<5}"
    f"{'B':<5}"
    f"{'C+':<5}"
    f"{'C':<5}"
    f"{'F':<5}"
)

print("-" * 48)

for number, subject in enumerate(
    subjects,
    start=1
):

    # Calculate grade for each student
    subject_grades = df[subject].apply(
        calculate_grade
    )

    # Count grades
    grade_counts = subject_grades.value_counts()

    print(
        f"{number:<5}"
        f"{subject:<8}"
        f"{int(grade_counts.get('A+', 0)):<5}"
        f"{int(grade_counts.get('A', 0)):<5}"
        f"{int(grade_counts.get('B+', 0)):<5}"
        f"{int(grade_counts.get('B', 0)):<5}"
        f"{int(grade_counts.get('C+', 0)):<5}"
        f"{int(grade_counts.get('C', 0)):<5}"
        f"{int(grade_counts.get('F', 0)):<5}"
    )


# ============================================================
# BACKLOG STUDENTS
# ============================================================

print_section("BACKLOG STUDENTS")

backlog_students = summary["backlog_students"]

if not backlog_students:

    print("No backlog students.")

else:

    for student in backlog_students:

        name = student["name"]
        subjects = student["subjects"]

        print(
            f"{name}: {', '.join(subjects)}"
        )


# ============================================================
# PASS / FAIL
# ============================================================

print_section("PASS / FAIL")

print(
    f"Pass : {summary['pass_fail']['Pass']}"
)

print(
    f"Fail : {summary['pass_fail']['Fail']}"
)


# ============================================================
# OVERALL GRADE DISTRIBUTION
# ============================================================

print_section("OVERALL GRADE DISTRIBUTION")

for grade, count in summary[
    "grade_distribution"
].items():

    print(
        f"{grade:<3}: {count}"
    )


# ============================================================
# CREATE CHARTS
# ============================================================

print_section("CHARTS CREATED")

charts = create_all_charts(student_df)

for chart_name, chart_path in charts.items():

    print()
    print(f"{chart_name}:")
    print(chart_path)