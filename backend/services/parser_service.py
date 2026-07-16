def parse_student_table(markdown):

    students = []

    lines = markdown.split("\n")

    for line in lines:

        # Skip non-table lines
        if "|" not in line:
            continue

        # Skip header
        if "Roll No" in line:
            continue

        # Skip separator
        if "---" in line:
            continue

        columns = [
            col.strip()
            for col in line.split("|")
            if col.strip()
        ]

        if len(columns) == 4:

            student = {
                "roll_no": int(columns[0]),
                "name": columns[1],
                "gpa": float(columns[2]),
                "status": columns[3]
            }

            students.append(student)

    return students