import os
import pandas as pd


UPLOAD_FOLDER = "uploads"


def read_excel_files():
    """
    Read all Excel files from uploads folder
    and combine them into one DataFrame.
    """

    dataframes = []

    for file_name in sorted(os.listdir(UPLOAD_FOLDER)):

        if file_name.lower().endswith((".xlsx", ".xls")):

            file_path = os.path.join(
                UPLOAD_FOLDER,
                file_name
            )

            print(f"Reading: {file_name}")

            df = pd.read_excel(
                file_path,
                engine="openpyxl"
            )

            dataframes.append(df)

    if not dataframes:
        raise FileNotFoundError(
            "No Excel files found in uploads folder."
        )

    combined_df = pd.concat(
        dataframes,
        ignore_index=True
    )

    return combined_df