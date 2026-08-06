import pandas as pd
import glob

def read_excel_files():

    files = glob.glob("uploads/*.xlsx")

    dataframes = []

    for file in files:
        df = pd.read_excel(file)
        dataframes.append(df)

    return pd.concat(dataframes, ignore_index=True)