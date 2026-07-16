<<<<<<< HEAD
import re


def parse_markdown_table(markdown):
=======
def parse_student_table(markdown):
>>>>>>> 7bb495c32c9a9e6a6b90c809ced05f42c8b09174

    students = []

    lines = markdown.split("\n")

    for line in lines:

<<<<<<< HEAD
        # skip header
        if "Roll No" in line:
            continue

        if "---" in line:
            continue

        parts = line.split("|")

        if len(parts) >= 5:

            student = {
                "Roll No": parts[1].strip(),
                "Name": parts[2].strip(),
                "GPA": parts[3].strip(),
                "Status": parts[4].strip()
=======
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
>>>>>>> 7bb495c32c9a9e6a6b90c809ced05f42c8b09174
            }

            students.append(student)

<<<<<<< HEAD

=======
>>>>>>> 7bb495c32c9a9e6a6b90c809ced05f42c8b09174
    return students