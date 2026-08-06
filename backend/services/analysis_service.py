def analyze_students(df):

    subjects = ["DSA", "WT", "OS", "OOP", "SAPM"]

    df["Total"] = df[subjects].sum(axis=1)
    df["Percentage"] = df["Total"] / len(subjects)

    df["Status"] = df["Percentage"].apply(
        lambda x: "Pass" if x >= 40 else "Fail"
    )

    total_students = len(df)
    passed_students = len(df[df["Status"] == "Pass"])
    failed_students = len(df[df["Status"] == "Fail"])

    pass_percentage = round((passed_students / total_students) * 100, 2)
    fail_percentage = round((failed_students / total_students) * 100, 2)

    highest_marks = {}

    for subject in subjects:

        highest = df[subject].max()

        student = df[df[subject] == highest]["Name"].values[0]

        highest_marks[subject] = {
            "Highest Mark": highest,
            "Student": student
        }

    return {
        "Total Students": total_students,
        "Passed Students": passed_students,
        "Failed Students": failed_students,
        "Pass Percentage": pass_percentage,
        "Fail Percentage": fail_percentage,
        "Highest Marks": highest_marks,
        "Student Details": df
    }