<<<<<<< HEAD
from fastapi import FastAPI
from routes import auth, student_files, fetch_jobs, analysis, dashboard

app = FastAPI(title="ScholarStats API")

app.include_router(auth.router)
app.include_router(student_files.router)
app.include_router(fetch_jobs.router)
app.include_router(analysis.router)
app.include_router(dashboard.router)

@app.get("/")
def home():
    return {"message": "Welcome to ScholarStats API"}
=======
import json
import pandas as pd
import os

from bot.driver import get_driver
from bot.login import open_website
from bot.parser import parse_data
from bot.scraper import scrape_result


def run_from_excel(file_path):
    # Read Excel file
    df = pd.read_excel(file_path)
    results = []

    # Start browser once (faster)
    driver = get_driver()

    try:
        for _, row in df.iterrows():

            # ✅ FIXED INDENTATION
            dob = pd.to_datetime(row["dob"], errors="coerce", dayfirst=True)

            if pd.isna(dob):
                print(f"Invalid DOB found: {row['dob']}")
                continue

            dob = dob.strftime("%d/%m/%Y")

            student = {
                "symbol_no": str(row["symbol_no"]),
                "dob": dob,
            }

            print(f"▶ Processing: {student['symbol_no']}")

            try:
                # Step 1: Login + search
                open_website(student)

                # Step 2: Scrape result
                raw = scrape_result(driver)

                # Step 3: Parse data
                parsed = parse_data(raw)

                # Save result
                results.append({
                    "symbol_no": student["symbol_no"],
                    "data": parsed
                })

            except Exception as e:
                print(f"⚠ Error processing {student['symbol_no']}: {e}")

    finally:
        input("⏸ Press ENTER to close browser...")
        driver.quit()

    return results


if __name__ == "__main__":
    input_file = "data/input/students.xlsx"

    # Run automation
    output = run_from_excel(input_file)

    # Ensure output folder exists
    os.makedirs("data/output", exist_ok=True)

    # Print results
    print("\n✅ FINAL OUTPUT:")
    for result in output:
        print(result)

    # Save JSON
    with open("data/output/results.json", "w") as f:
        json.dump(output, f, indent=4)

    print("📁 JSON saved: data/output/results.json")

    # ✅ Convert to Excel
    flat_data = []

    for result in output:
        row = {"symbol_no": result["symbol_no"]}
        row.update(result["data"])  
        flat_data.append(row)

    df = pd.DataFrame(flat_data)
    df.to_excel("data/output/results.xlsx", index=False)

    print("📊 Excel saved: data/output/results.xlsx")
>>>>>>> 62170f56af6b521a60ef89887ace82b70fa05f3b
