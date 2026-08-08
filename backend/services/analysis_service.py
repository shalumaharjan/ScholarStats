def get_grade_point(mark):

    if mark >= 90:
        return 4.0
    elif mark >= 80:
        return 3.6
    elif mark >= 70:
        return 3.2
    elif mark >= 60:
        return 2.8
    elif mark >= 50:
        return 2.4
    elif mark >= 40:
        return 2.0
    else:
        return 0.0


def analyze_students(df):

    subjects = [
        "DSA",
        "WT",
        "OS",
        "OOP",
        "SAPM"
    ]

    # Total marks
    df["Total"] = df[subjects].sum(axis=1)

    # Percentage
    df["Percentage"] = df["Total"] / len(subjects)

    # Grade points for each subject
    for subject in subjects:

        df[f"{subject}_GP"] = df[subject].apply(
            get_grade_point
        )

    # SGPA
    grade_point_columns = [
        f"{subject}_GP"
        for subject in subjects
    ]

    df["SGPA"] = df[grade_point_columns].mean(axis=1).round(2)

    # Pass / Fail
    df["Status"] = df["Percentage"].apply(
        lambda x: "Pass" if x >= 40 else "Fail"
    )

    # Summary
    summary = {
        "total_students": len(df),

        "passed_students": len(
            df[df["Status"] == "Pass"]
        ),

        "failed_students": len(
            df[df["Status"] == "Fail"]
        ),

        "average_percentage": round(
            df["Percentage"].mean(),
            2
        ),

        "average_sgpa": round(
            df["SGPA"].mean(),
            2
        )
    }

    return df, summary