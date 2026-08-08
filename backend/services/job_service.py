from services.fetch_results import HeadlessResultChecker

def create_fetch_job(data):
    # 🔹 Mapping
    exam_type_map = {
        "Regular/Retake": "Regular_Retake",
        "Rechecking/Retotaling": "Rechecking_Retotaling",
        "Chance": "Chance"
    }

    semester_map = {
        "First": "1st",
        "Second": "2nd",
        "Third": "3rd",
        "Fourth": "4th",
        "Fifth": "5th",
        "Sixth": "6th",
        "Seventh": "7th",
        "Eighth": "8th"
    }

    # 🔹 Build student data
    student = {
        "ern": "24530044",  # later you will fetch from DB
        "dob": "12-01-2005",
        "exam_type": exam_type_map[data.resultType],
        "year": data.academicYear,
        "session": data.academicSession,
        "semester": semester_map[data.semester],
        "program": "Bachelor of Computer Application"
    }

    checker = HeadlessResultChecker()

    try:
        result = fetcher.fetch_result(student)

        if result is None:
            return {
                "success": False,
                "fetchJobId": "JOB-001",
                "message": "Result fetch failed"
            }

        return {
            "success": True,
            "fetchJobId": "JOB-001",
            "message": "Result fetched successfully",
            "result": result.to_dict(orient="records")
        }

    finally:
        fetcher.close()