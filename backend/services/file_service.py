import pandas as pd
import os


UPLOAD_FOLDER = "uploads"


def read_excel_files():

    files = [
        file
        for file in os.listdir(UPLOAD_FOLDER)
        if file.endswith(".xlsx")
    ]

    if not files:
        raise FileNotFoundError(
            "No Excel file found in uploads folder."
        )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        files[0]
    )

    df = pd.read_excel(
        file_path,
        engine="openpyxl"
    )

    return df