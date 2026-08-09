import os

import matplotlib.pyplot as plt
import pandas as pd


# =========================================================
# CHART DIRECTORY
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

CHART_DIR = os.path.join(
    BASE_DIR,
    "uploads",
    "charts"
)

os.makedirs(
    CHART_DIR,
    exist_ok=True
)


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
# HIGHEST MARKS BAR CHART
# =========================================================

def create_highest_marks_chart(df):

    highest_values = []
    highest_students = []

    for subject in SUBJECTS:

        index = df[subject].idxmax()

        highest_values.append(
            df.loc[index, subject]
        )

        highest_students.append(
            df.loc[index, "Name"]
        )

    plt.figure(figsize=(10, 6))

    bars = plt.bar(
        SUBJECTS,
        highest_values
    )

    plt.title(
        "Highest Marks in Each Subject"
    )

    plt.xlabel("Subjects")
    plt.ylabel("Marks")

    plt.ylim(0, 100)

    # Display student names above bars
    for bar, student, value in zip(
        bars,
        highest_students,
        highest_values
    ):

        plt.text(
            bar.get_x() + bar.get_width() / 2,
            value + 1,
            f"{student} ({int(value)})",
            ha="center"
        )

    plt.tight_layout()

    path = os.path.join(
        CHART_DIR,
        "highest_marks.png"
    )

    plt.savefig(path)
    plt.close()

    return path


# =========================================================
# STUDENT PERFORMANCE LINE CHART
# =========================================================

def create_performance_chart(df):

    plt.figure(figsize=(16, 7))

    plt.plot(
        df["Name"],
        df["Percentage"],
        marker="o"
    )

    plt.title(
        "Student Performance"
    )

    plt.xlabel("Students")
    plt.ylabel("Percentage")

    plt.xticks(
        rotation=90
    )

    plt.ylim(0, 100)

    plt.tight_layout()

    path = os.path.join(
        CHART_DIR,
        "student_performance.png"
    )

    plt.savefig(path)
    plt.close()

    return path


# =========================================================
# PASS / FAIL PIE CHART
# =========================================================

def create_pass_fail_chart(df):

    pass_count = int(
        (df["Status"] == "Pass").sum()
    )

    fail_count = int(
        (df["Status"] == "Fail").sum()
    )

    labels = [
        "Pass",
        "Fail"
    ]

    values = [
        pass_count,
        fail_count
    ]

    plt.figure(figsize=(7, 7))

    plt.pie(
        values,
        labels=labels,
        autopct="%1.1f%%",
        startangle=90
    )

    plt.title(
        "Pass vs Fail"
    )

    plt.tight_layout()

    path = os.path.join(
        CHART_DIR,
        "pass_fail.png"
    )

    plt.savefig(path)
    plt.close()

    return path


# =========================================================
# GRADE DISTRIBUTION BAR CHART
# =========================================================

def create_grade_distribution_chart(df):

    grades = [
        "A+",
        "A",
        "B+",
        "B",
        "C+",
        "C",
        "F"
    ]

    values = [
        int((df["Grade"] == grade).sum())
        for grade in grades
    ]

    plt.figure(figsize=(10, 6))

    plt.bar(
        grades,
        values
    )

    plt.title(
        "Overall Grade Distribution"
    )

    plt.xlabel("Grade")
    plt.ylabel("Number of Students")

    plt.tight_layout()

    path = os.path.join(
        CHART_DIR,
        "grade_distribution.png"
    )

    plt.savefig(path)
    plt.close()

    return path


# =========================================================
# CREATE ALL CHARTS
# =========================================================

def create_all_charts(df):

    return {
        "highest_marks": create_highest_marks_chart(df),
        "performance": create_performance_chart(df),
        "pass_fail": create_pass_fail_chart(df),
        "grades": create_grade_distribution_chart(df)
    }