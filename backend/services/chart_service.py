import matplotlib.pyplot as plt


# ==========================================
# PASS VS FAIL CHART
# ==========================================

def pass_fail_chart(df):

    pass_count = (df["Status"] == "Pass").sum()
    fail_count = (df["Status"] == "Fail").sum()

    labels = ["Pass", "Fail"]
    values = [pass_count, fail_count]

    plt.figure(figsize=(6, 5))

    bars = plt.bar(labels, values)

    plt.title("Pass vs Fail Students")
    plt.xlabel("Result")
    plt.ylabel("Number of Students")

    for bar in bars:
        y = bar.get_height()

        plt.text(
            bar.get_x() + bar.get_width() / 2,
            y + 0.5,
            str(int(y)),
            ha="center"
        )

    plt.tight_layout()
    plt.show()


# ==========================================
# HIGHEST MARKS IN EACH SUBJECT
# ==========================================

def highest_subject_chart(df):

    subjects = ["DSA", "WT", "OS", "OOP", "SAPM"]

    marks = []

    for subject in subjects:
        marks.append(df[subject].max())

    plt.figure(figsize=(8, 5))

    bars = plt.bar(subjects, marks)

    plt.title("Highest Marks in Each Subject")
    plt.xlabel("Subject")
    plt.ylabel("Highest Marks")

    for bar in bars:
        y = bar.get_height()

        plt.text(
            bar.get_x() + bar.get_width() / 2,
            y + 1,
            str(int(y)),
            ha="center"
        )

    plt.ylim(0, 100)
    plt.tight_layout()
    plt.show()


# ==========================================
# HIGHEST OVERALL SGPA
# ==========================================

def highest_overall_chart(df):

    top_students = (
        df.sort_values(
            by="SGPA",
            ascending=False
        )
        .head(10)
    )

    names = top_students["Name"].tolist()
    sgpas = top_students["SGPA"].tolist()

    plt.figure(figsize=(10, 5))

    bars = plt.bar(names, sgpas)

    plt.title("Highest Overall SGPA")
    plt.xlabel("Student")
    plt.ylabel("SGPA")

    for bar in bars:

        y = bar.get_height()

        plt.text(
            bar.get_x() + bar.get_width() / 2,
            y + 0.05,
            f"{y:.2f}",
            ha="center"
        )

    plt.ylim(0, 4.5)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()