import re


def parse_markdown_table(markdown):

    students = []

    lines = markdown.split("\n")

    for line in lines:

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
            }

            students.append(student)


    return students