def analyze_students(students):
<<<<<<< HEAD

    total_students = len(students)

    passed = 0
    failed = 0

    total_gpa = 0

    for student in students:

        total_gpa += float(student["GPA"])

        if student["Status"] == "Pass":
            passed += 1
        else:
            failed += 1


    average_gpa = total_gpa / total_students


    return {
        "total_students": total_students,
        "passed_students": passed,
        "failed_students": failed,
        "average_gpa": round(average_gpa,2)
=======
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
>>>>>>> 7bb495c32c9a9e6a6b90c809ced05f42c8b09174
    }