import matplotlib.pyplot as plt


# ==========================================
# PASS VS FAIL CHART
# ==========================================

def pass_fail_chart(df):

    passed = len(
        df[df["Status"] == "Pass"]
    )

    failed = len(
        df[df["Status"] == "Fail"]
    )

    plt.figure(figsize=(7, 5))

    plt.bar(
        ["Pass", "Fail"],
        [passed, failed]
    )

    plt.xlabel("Result")
    plt.ylabel("Number of Students")
    plt.title("Pass vs Fail Students")

    plt.tight_layout()
    plt.show()

    return {
        "passed": passed,
        "failed": failed
    }


# ==========================================
# TOP 10 STUDENTS BY SGPA
# ==========================================

def highest_overall_chart(df):

    top_students = (
        df.sort_values(
            by="SGPA",
            ascending=False
        )
        .head(10)
    )

    plt.figure(figsize=(10, 6))

    plt.bar(
        top_students["Name"],
        top_students["SGPA"]
    )

    plt.xlabel("Student")
    plt.ylabel("SGPA")
    plt.title("Top 10 Students by SGPA")

    plt.xticks(rotation=45)

    plt.tight_layout()
    plt.show()

    return top_students[
        ["Student_ID", "Name", "SGPA"]
    ]


# ==========================================
# HIGHEST MARKS IN EACH SUBJECT
# ==========================================

def highest_subject_chart(df):

    subjects = [
        "DSA",
        "WT",
        "OS",
        "OOP",
        "SAPM"
    ]

    highest_marks = df[subjects].max()

    highest_students = {}

    for subject in subjects:

        max_mark = df[subject].max()

        student = df.loc[
            df[subject].idxmax(),
            "Name"
        ]

        highest_students[subject] = {
            "student": student,
            "marks": int(max_mark)
        }

    # Create chart
    plt.figure(figsize=(10, 6))

    plt.bar(
        subjects,
        highest_marks
    )

    plt.xlabel("Subject")
    plt.ylabel("Highest Marks")
    plt.title("Highest Marks in Each Subject")

    plt.tight_layout()
    plt.show()

    return highest_students