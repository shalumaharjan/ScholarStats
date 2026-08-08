import pandas as pd
import os


def read_excel_files():

    upload_folder = "uploads"

    files = [
        file
        for file in os.listdir(upload_folder)
        if file.endswith(".xlsx")
    ]

    dataframes = []

    for file in files:

        file_path = os.path.join(
            upload_folder,
            file
        )

        df = pd.read_excel(file_path, engine="openpyxl")

        dataframes.append(df)

    if not dataframes:
        return pd.DataFrame()

    return pd.concat(
        dataframes,
        ignore_index=True
    )