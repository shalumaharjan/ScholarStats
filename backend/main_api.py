from fastapi import FastAPI, UploadFile, File
import pandas as pd
import os

from bot.driver import get_driver
from bot.login import open_website
from bot.parser import parse_data
from bot.scraper import scrape_result
app = FastAPI()

@app.post("/run")
async def run_bot(file: UploadFile = File(...)):

    # Save uploaded file
    input_path = "data/input/uploaded.xlsx"
    os.makedirs("data/input", exist_ok=True)

    with open(input_path, "wb") as f:
        f.write(await file.read())

    df = pd.read_excel(input_path)
    results = []

    driver = get_driver()

    try:
        for _, row in df.iterrows():

            dob = pd.to_datetime(row["dob"], errors="coerce", dayfirst=True)

            if pd.isna(dob):
                continue

            dob = dob.strftime("%d/%m/%Y")

            student = {
                "symbol_no": str(row["symbol_no"]),
                "dob": dob,
            }

            try:
                open_website(student)
                raw = scrape_result(driver)
                parsed = parse_data(raw)

                results.append({
                    "symbol_no": student["symbol_no"],
                    "data": parsed
                })

            except Exception as e:
                print(e)

    finally:
        driver.quit()

    return {"results": results}

