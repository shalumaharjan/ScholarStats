import pandas as pd


SUBJECTS = [
    "DSA",
    "WT",
    "OS",
    "OOP",
    "SAPM"
]


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


def analyze_students(df):

    df = df.copy()

    # Total marks
    df["Total"] = df[SUBJECTS].sum(axis=1)

    # Percentage
    df["Percentage"] = (
        df["Total"] / (len(SUBJECTS) * 100)
    ) * 100

    # Grade
    df["Grade"] = df["Percentage"].apply(
        calculate_grade
    )

    # Pass / Fail
    df["Status"] = df["Percentage"].apply(
        lambda x: "Pass" if x >= 40 else "Fail"
    )

    total_students = len(df)

    passed_students = len(
        df[df["Status"] == "Pass"]
    )

    failed_students = len(
        df[df["Status"] == "Fail"]
    )

    average_percentage = round(
        df["Percentage"].mean(),
        2
    )

    return {
        "Total Students": total_students,
        "Passed Students": passed_students,
        "Failed Students": failed_students,
        "Average Percentage": average_percentage,
        "Data": df
    }