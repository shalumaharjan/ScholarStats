def analyze_students(df):

    df["Total"] = df["Math"] + df["English"] + df["Science"]
    df["Percentage"] = df["Total"] / 3
    df["Status"] = df["Percentage"].apply(
        lambda x: "Pass" if x >= 40 else "Fail"
    )

    summary = {
        "total_students": len(df),
        "passed_students": len(df[df["Status"] == "Pass"]),
        "failed_students": len(df[df["Status"] == "Fail"]),
        "average_percentage": round(df["Percentage"].mean(), 2)
    }

    return df, summary