import pandas as pd


# =========================================================
# SUBJECTS
# =========================================================

def get_subjects(df):
    ignore_columns = [
        "SN",
        "Student_ID",
        "Exam_Roll_No",
        "ERN",
        "CRN",
        "Registration No.",
        "Name",
        "Date of Birth",
        "DOB",
        "SGPA",
        "Grade",
        "Total",
        "Percentage",
        "Status",
        "Backlog Subjects"
    ]
    subjects = []
    for column in df.columns:
        if column not in ignore_columns:
            subjects.append(column)
    return subjects

GRADES = [
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "F",
    "ABS"
]

# =========================================================
# BACKLOG SUBJECT CALCULATION
# =========================================================
def get_backlog_subjects(row, subjects):
    backlog = []
    for subject in subjects:
        grade = str(row[subject]).strip().upper()
        if grade in ["F", "ABS"]:
            backlog.append(subject)
    return backlog

def calculate_sgpa_grade(sgpa):
    if sgpa >= 3.7:
        return "A"
    elif sgpa >= 3.3:
        return "B+"
    elif sgpa >= 3.0:
        return "B"
    elif sgpa >= 2.0:
        return "C"
    else:
        return "F"

def calculate_status(row, subjects):
    for subject in subjects:
        grade = str(row[subject]).strip().upper()
        if grade in ["F", "ABS"]:
            return "Fail"
    sgpa = str(row["SGPA"]).strip()
    if sgpa == "-" or sgpa == "":
        return "Fail"
    return "Pass"

# =========================================================
# ANALYZE STUDENTS
# =========================================================

def analyze_students(df):

    # Make a copy so original DataFrame is not changed
    df = df.copy()

    # Convert SGPA to numeric
    df["SGPA"] = pd.to_numeric(
        df["SGPA"],
        errors="coerce"
    )
    df["SGPA"] = df["SGPA"].fillna(0)

    # -----------------------------------------------------
    # Make sure marks are numeric
    # -----------------------------------------------------

    subjects = get_subjects(df)

    # -----------------------------------------------------
    # Total marks
    # -----------------------------------------------------

    # df["Total"] = df[SUBJECTS].sum(axis=1)

    # -----------------------------------------------------
    # Percentage
    # 5 subjects × 100 = 500
    # -----------------------------------------------------

    # df["Percentage"] = (
    #     df["Total"] / 500
    # ) * 100

    # df["Percentage"] = df["Percentage"].round(2)

    # -----------------------------------------------------
    # Status
    #
    # Student must get at least 40 in EVERY subject.
    # -----------------------------------------------------

    df["Status"] = df.apply(
        lambda row: calculate_status(row, subjects),
        axis=1
    )

    # -----------------------------------------------------
    # Backlog Subjects
    # -----------------------------------------------------

    df["Backlog Subjects"] = df.apply(
        lambda row: get_backlog_subjects(row, subjects),
        axis=1
    )

    # =====================================================
    # SUMMARY
    # =====================================================

    total_students = len(df)

    passed_students = int(
        (df["Status"] == "Pass").sum()
    )

    failed_students = int(
        (df["Status"] == "Fail").sum()
    )

    pass_percentage = (
        passed_students / total_students * 100
        if total_students > 0
        else 0
    )

    fail_percentage = (
        failed_students / total_students * 100
        if total_students > 0
        else 0
    )

    # =====================================================
    # HIGHEST OVERALL PERFORMANCE
    # =====================================================

    highest_index = df["SGPA"].idxmax()

    highest_student = {
        "student_id": int(
            df.loc[highest_index,"Student_ID"]
        ),
        "name": str(
            df.loc[highest_index,"Name"]
        ),
        "sgpa": float(
            df.loc[highest_index,"SGPA"]
        )
    }

    # =====================================================
    # PASS / FAIL
    # =====================================================

    pass_fail = {
        "Pass": passed_students,
        "Fail": failed_students
    }

    # =====================================================
    # GRADE DISTRIBUTION
    # =====================================================

    df["Grade"] = df["SGPA"].apply(
        calculate_sgpa_grade
    )

    grade_distribution = (
        df["Grade"]
        .value_counts()
        .to_dict()
    )

    subject_performance = {}
    total = len(df)

    for subject in subjects:
        failed = int(
            (df[subject] == "F").sum()
        )
        passed = total - failed
        subject_performance[subject] = {
            "pass": passed,
            "fail": failed,
            "pass_percentage": round(
                (passed / total) * 100,
                2
            )
        }
   # =====================================================
    #subject-grade-distribution
       # =====================================================
    subject_grade_distribution = {}
    for subject in subjects:
        df[subject] = (
            df[subject]
            .astype(str)
            .str.strip()
            .str.upper()
            .replace({
                "ABSENT": "ABS",
                "ABS ": "ABS",
                "A.B.S": "ABS",
            })
        )
        distribution = (
            df[subject]
            .value_counts()
            .to_dict()
        )
        for grade in GRADES:
            if grade not in distribution:
                distribution[grade] = 0
        subject_grade_distribution[subject] = distribution 

    # =====================================================
    # BACKLOG STUDENTS
    # =====================================================
    backlog_students = []
    for _, row in df.iterrows():
        failed_subjects = []
        for subject in subjects:
            grade = (
                str(row[subject])
                .strip()
                .upper()
            )
            if grade in ["F", "ABS"]:
                failed_subjects.append(subject)
        sgpa = str(row["SGPA"]).strip()
        if sgpa == "-":
            if not failed_subjects:
                failed_subjects.append("Incomplete")
        if failed_subjects:
            backlog_students.append({
                "student_id": int(row["Student_ID"]),
                "name": str(row["Name"]),
                "subjects": failed_subjects
            })

    # =====================================================
    # RESULT
    # =====================================================

    summary = {
        "subjects": subjects,
        "total_students": total_students,
        "passed_students": passed_students,
        "failed_students": failed_students,
        "pass_percentage": round(
            pass_percentage,
            2
        ),
        "average_sgpa": round(
            float(df["SGPA"].mean()),
            2
        ),
        "highest_student": highest_student,
        "subject_performance": subject_performance,
        "subject_grade_distribution":
            subject_grade_distribution,
        "grade_distribution":
            grade_distribution,
        "backlog_students":
            backlog_students
    }
    df = df.fillna("")

    return df, summary