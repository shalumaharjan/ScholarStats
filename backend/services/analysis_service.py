def analyze_students(students):
    """
    Analyze student results.
    """

    if not students:
        return {
            "message": "No student data found."
        }

    total_students = len(students)

    highest_gpa = max(student["gpa"] for student in students)

    lowest_gpa = min(student["gpa"] for student in students)

    average_gpa = round(
        sum(student["gpa"] for student in students) / total_students,
        2
    )

    passed_students = len(
        [student for student in students if student["status"].lower() == "pass"]
    )

    failed_students = len(
        [student for student in students if student["status"].lower() == "fail"]
    )

    pass_percentage = round(
        (passed_students / total_students) * 100,
        2
    )

    topper = max(students, key=lambda student: student["gpa"])

    return {
        "total_students": total_students,
        "highest_gpa": highest_gpa,
        "lowest_gpa": lowest_gpa,
        "average_gpa": average_gpa,
        "passed_students": passed_students,
        "failed_students": failed_students,
        "pass_percentage": pass_percentage,
        "topper": topper
    }