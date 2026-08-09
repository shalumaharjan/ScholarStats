import pandas as pd


# =========================================================
# SUBJECTS
# =========================================================

SUBJECTS = [
    "DSA",
    "WT",
    "OS",
    "OOP",
    "SAPM"
]


# =========================================================
# GRADE CALCULATION
# =========================================================

def calculate_grade(percentage):

    if percentage >= 90:
        return "A+"

    elif percentage >= 80:
        return "A"

    elif percentage >= 70:
        return "B+"

    elif percentage >= 60:
        return "B"

    elif percentage >= 50:
        return "C+"

    elif percentage >= 40:
        return "C"

    else:
        return "F"


# =========================================================
# BACKLOG SUBJECT CALCULATION
# =========================================================

def get_backlog_subjects(row):

    backlog = []

    for subject in SUBJECTS:

        if row[subject] < 40:
            backlog.append(subject)

    if backlog:
        return ", ".join(backlog)

    return "None"


# =========================================================
# ANALYZE STUDENTS
# =========================================================

def analyze_students(df):

    # Make a copy so original DataFrame is not changed
    df = df.copy()

    # -----------------------------------------------------
    # Make sure marks are numeric
    # -----------------------------------------------------

    for subject in SUBJECTS:

        df[subject] = pd.to_numeric(
            df[subject],
            errors="coerce"
        )

    # -----------------------------------------------------
    # Total marks
    # -----------------------------------------------------

    df["Total"] = df[SUBJECTS].sum(axis=1)

    # -----------------------------------------------------
    # Percentage
    # 5 subjects × 100 = 500
    # -----------------------------------------------------

    df["Percentage"] = (
        df["Total"] / 500
    ) * 100

    df["Percentage"] = df["Percentage"].round(2)

    # -----------------------------------------------------
    # Status
    #
    # Student must get at least 40 in EVERY subject.
    # -----------------------------------------------------

    df["Status"] = df[SUBJECTS].apply(
        lambda row: "Pass"
        if (row >= 40).all()
        else "Fail",
        axis=1
    )

    # -----------------------------------------------------
    # Backlog Subjects
    # -----------------------------------------------------

    df["Backlog Subjects"] = df.apply(
        get_backlog_subjects,
        axis=1
    )

    # -----------------------------------------------------
    # Grade
    # -----------------------------------------------------

    df["Grade"] = df["Percentage"].apply(
        calculate_grade
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
    # HIGHEST MARKS IN EACH SUBJECT
    # =====================================================

    highest_marks = {}

    for subject in SUBJECTS:

        index = df[subject].idxmax()

        highest_marks[subject] = {
            "student_id": int(df.loc[index, "Student_ID"]),
            "name": str(df.loc[index, "Name"]),
            "marks": int(df.loc[index, subject])
        }

    # =====================================================
    # HIGHEST OVERALL PERFORMANCE
    # =====================================================

    highest_index = df["Percentage"].idxmax()

    highest_student = {
        "student_id": int(
            df.loc[highest_index, "Student_ID"]
        ),
        "name": str(
            df.loc[highest_index, "Name"]
        ),
        "total": int(
            df.loc[highest_index, "Total"]
        ),
        "percentage": float(
            df.loc[highest_index, "Percentage"]
        ),
        "grade": str(
            df.loc[highest_index, "Grade"]
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

    grade_distribution = (
        df["Grade"]
        .value_counts()
        .to_dict()
    )

    # =====================================================
    # BACKLOG STUDENTS
    # =====================================================

    backlog_students = []

    for _, row in df.iterrows():

        if row["Status"] == "Fail":

            subjects = []

            for subject in SUBJECTS:

                if row[subject] < 40:
                    subjects.append(subject)

            backlog_students.append({
                "student_id": int(row["Student_ID"]),
                "name": str(row["Name"]),
                "subjects": subjects
            })

    # =====================================================
    # RESULT
    # =====================================================

    summary = {
        "total_students": total_students,

        "passed_students": passed_students,

        "failed_students": failed_students,

        "pass_percentage": round(
            pass_percentage,
            2
        ),

        "fail_percentage": round(
            fail_percentage,
            2
        ),

        "highest_marks": highest_marks,

        "highest_overall": highest_student,

        "pass_fail": pass_fail,

        "grade_distribution": grade_distribution,

        "backlog_students": backlog_students
    }

    return df, summary