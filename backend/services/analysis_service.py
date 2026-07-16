def analyze_students(students):

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
    }