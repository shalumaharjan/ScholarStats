import matplotlib.pyplot as plt


def show_student_summary(result):

    labels = ["Total", "Pass", "Fail"]

    values = [
        result["Total Students"],
        result["Passed Students"],
        result["Failed Students"]
    ]

    plt.figure(figsize=(6,5))

    bars = plt.bar(labels, values)

    plt.title("Student Summary")
    plt.xlabel("Category")
    plt.ylabel("Number of Students")

    for bar in bars:
        y = bar.get_height()

        plt.text(
            bar.get_x() + bar.get_width()/2,
            y + 0.5,
            str(int(y)),
            ha="center"
        )

    plt.show()


def show_highest_marks(result):

    subjects = []
    marks = []

    for subject, data in result["Highest Marks"].items():

        subjects.append(subject)
        marks.append(data["Highest Mark"])

    plt.figure(figsize=(7,5))

    bars = plt.bar(subjects, marks)

    plt.title("Highest Marks in Each Subject")
    plt.xlabel("Subjects")
    plt.ylabel("Marks")

    for bar in bars:
        y = bar.get_height()

        plt.text(
            bar.get_x() + bar.get_width()/2,
            y + 1,
            str(int(y)),
            ha="center"
        )

    plt.ylim(0,100)

    plt.show()