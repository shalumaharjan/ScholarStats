import pandas as pd


# ==========================================
# SUBJECT COLUMNS
# ==========================================

SUBJECTS = [
    "DSA",
    "WT",
    "OS",
    "OOP",
    "SAPM"
]


# ==========================================
# PREPARE STUDENT DATA
# ==========================================

def prepare_student_data(df):

    df = df.copy()

    # Calculate total marks
    df["Total"] = df[SUBJECTS].sum(axis=1)

    # Calculate percentage
    df["Percentage"] = (
        df["Total"] / (len(SUBJECTS) * 100)
    ) * 100

    # ==========================================
    # CALCULATE GRADE
    # ==========================================

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

    df["Grade"] = df["Percentage"].apply(
        calculate_grade
    )

    # ==========================================
    # CALCULATE STATUS
    # ==========================================

    df["Status"] = df["Percentage"].apply(
        lambda percentage:
        "Pass" if percentage >= 40 else "Fail"
    )

    return df


# ==========================================
# PASS VS FAIL DATA
# ==========================================

def get_pass_fail_data(df):

    df = prepare_student_data(df)

    passed = len(
        df[df["Status"] == "Pass"]
    )

    failed = len(
        df[df["Status"] == "Fail"]
    )

    return {
        "labels": ["Pass", "Fail"],
        "values": [passed, failed]
    }


# ==========================================
# GRADE-WISE DATA
# ==========================================

def get_grade_data(df):

    df = prepare_student_data(df)

    grade_counts = (
        df["Grade"]
        .value_counts()
        .sort_index()
    )

    return {
        "labels": grade_counts.index.tolist(),
        "values": grade_counts.values.tolist()
    }


# ==========================================
# GRADE BAR CHART
# ==========================================

def grade_bar_chart(df):

    return get_grade_data(df)