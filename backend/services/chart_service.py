import os

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt


CHART_FOLDER = "uploads/charts"


# =========================================================
# CREATE CHART FOLDER
# =========================================================

def create_chart_folder():

    os.makedirs(
        CHART_FOLDER,
        exist_ok=True
    )


# =========================================================
# HIGHEST MARKS CHART
# =========================================================

def create_highest_marks_chart(df):

    create_chart_folder()

    subjects = [
        "DSA",
        "WT",
        "OS",
        "OOP",
        "SAPM"
    ]

    highest_marks = [
        df[subject].max()
        for subject in subjects
    ]

    plt.figure(figsize=(10, 6))

    plt.bar(
        subjects,
        highest_marks
    )

    plt.title(
        "Highest Marks in Each Subject"
    )

    plt.xlabel("Subjects")

    plt.ylabel("Marks")

    plt.ylim(0, 100)

    plt.tight_layout()

    path = os.path.join(
        CHART_FOLDER,
        "highest_marks.png"
    )

    plt.savefig(path)

    plt.close()

    return path


# =========================================================
# STUDENT PERFORMANCE CHART
# =========================================================

def create_performance_chart(df):

    create_chart_folder()

    plt.figure(figsize=(12, 6))

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
        CHART_FOLDER,
        "student_performance.png"
    )

    plt.savefig(path)

    plt.close()

    return path


# =========================================================
# PASS FAIL CHART
# =========================================================

def create_pass_fail_chart(df):

    create_chart_folder()

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
        CHART_FOLDER,
        "pass_fail.png"
    )

    plt.savefig(path)

    plt.close()

    return path


# =========================================================
# GRADE DISTRIBUTION CHART
# =========================================================

def create_grade_chart(df):

    create_chart_folder()

    grade_order = [
        "A+",
        "A",
        "B+",
        "B",
        "C+",
        "C",
        "F"
    ]

    grade_counts = (
        df["Grade"]
        .value_counts()
        .reindex(
            grade_order,
            fill_value=0
        )
    )

    plt.figure(figsize=(9, 6))

    plt.bar(
        grade_counts.index,
        grade_counts.values
    )

    plt.title(
        "Grade Distribution"
    )

    plt.xlabel("Grade")

    plt.ylabel("Number of Students")

    plt.tight_layout()

    path = os.path.join(
        CHART_FOLDER,
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

        "student_performance": create_performance_chart(df),

        "pass_fail": create_pass_fail_chart(df),

        "grade_distribution": create_grade_chart(df)
    }