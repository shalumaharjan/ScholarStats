def parse_data(raw):
    """
    Clean and structure scraped data
    """

    parsed = {}

    # 🟢 Header (student info raw text)
    parsed["student_info"] = raw.get("header", "")

    # 🟢 Subjects
    parsed["subjects"] = raw.get("subjects", [])

    # 🟢 SGPA
    parsed["sgpa"] = raw.get("sgpa", "")

    return parsed