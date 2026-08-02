from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

from io import StringIO
import pandas as pd


class ResultFetcher:
    def __init__(self, headless=False):
        self.driver = None
        self.setup_driver(headless)

    def setup_driver(self, headless):
        options = Options()

        if headless:
            options.add_argument("--headless=new")

        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")

        self.driver = webdriver.Chrome(options=options)
        self.wait = WebDriverWait(self.driver, 20)

    def fetch_result(self, student):
        try:
            print(f"\n🔎 Checking ERN: {student['ern']}")

            self.driver.get("https://exam.pu.edu.np:9094/")

            # Wait for page load
            self.wait.until(EC.presence_of_element_located((By.ID, "Exam_Type")))

            # Fill form
            Select(self.driver.find_element(By.ID, "Exam_Type"))\
                .select_by_value(student["exam_type"])

            Select(self.driver.find_element(By.ID, "Year"))\
                .select_by_value(student["year"])

            Select(self.driver.find_element(By.ID, "Academic_System"))\
                .select_by_value(student["session"])

            Select(self.driver.find_element(By.ID, "Semester"))\
                .select_by_value(student["semester"])

            Select(self.driver.find_element(By.ID, "Program"))\
                .select_by_visible_text(student["program"])

            # Symbol Number
            symbol = self.driver.find_element(By.ID, "Symbol_Number")
            symbol.clear()
            symbol.send_keys(student["ern"])

            # DOB
            dob = self.driver.find_element(By.ID, "DOB")
            dob.clear()
            dob.send_keys(student["dob"])

            print("📤 Submitting form...")
            self.driver.find_element(By.XPATH, "//input[@type='submit']").click()

            # Wait until result table appears
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//table")))

            html = self.driver.page_source

            # Read all tables
            tables = pd.read_html(StringIO(html))

            if len(tables) == 0:
                print("❌ No table found")
                return None

            # Main result table (subjects)
            result_table = tables[-1]

            # Clean column names
            result_table.columns = [str(col).strip() for col in result_table.columns]

            # Keep only needed columns
            result_table = result_table[["Course Title", "Grade"]]

            # Subject mapping
            subject_map = {
                "Object Oriented Programming using Java": "OOP",
                "Data Structure and Algorithms": "DSA",
                "System Analysis and Project Management": "SAPM",
                "Web Technologies I": "WT-I",
                "Operating System": "OS"
            }

            # Clean names
            result_table["Course Title"] = result_table["Course Title"].str.strip()
            result_table["Course Title"] = result_table["Course Title"].replace(subject_map)

            # ❌ Remove Total row
            result_table = result_table[
                ~result_table["Course Title"].str.contains("Total", na=False)
            ]

            # ✅ Convert rows → columns
            pivot = result_table.pivot_table(
                index=None,
                columns="Course Title",
                values="Grade",
                aggfunc="first"
            )

            pivot = pivot.reset_index(drop=True)

            # 🔥 Extract SGPA from HTML text
            sgpa = ""

            try:
                page_text = self.driver.find_element(By.TAG_NAME, "body").text
                for line in page_text.split("\n"):
                    if "SGPA" in line:
                        sgpa = line.split("=")[-1].strip()
                        break
            except:
                sgpa = ""

            # Add ERN
            pivot.insert(0, "ERN", student["ern"])

            # Add SGPA column
            pivot["SGPA"] = sgpa

            print(f"✅ Done: {student['ern']}")
            return pivot

        except Exception as e:
            print(f"❌ Error {student['ern']}: {e}")
            return None

    def close(self):
        if self.driver:
            self.driver.quit()


def main():
    students = [
        {
            "ern": "24530044",
            "dob": "12-01-2005",
            "exam_type": "Regular_Retake",
            "year": "2025",
            "session": "Fall",
            "semester": "3rd",
            "program": "Bachelor of Computer Application"
        },
        {
            "ern": "24530090",
            "dob": "03-14-2004",
            "exam_type": "Regular_Retake",
            "year": "2025",
            "session": "Fall",
            "semester": "3rd",
            "program": "Bachelor of Computer Application"
        },
        {
            "ern": "24530049",
            "dob": "03-06-2004",
            "exam_type": "Regular_Retake",
            "year": "2025",
            "session": "Fall",
            "semester": "3rd",
            "program": "Bachelor of Computer Application"
        },
        {
            "ern": "24530057",
            "dob": "05-15-2002",
            "exam_type": "Regular_Retake",
            "year": "2025",
            "session": "Fall",
            "semester": "3rd",
            "program": "Bachelor of Computer Application"
        }
    ]

    fetcher = ResultFetcher(headless=False)
    all_results = []

    for student in students:
        result = fetcher.fetch_result(student)
        if result is not None:
            all_results.append(result)

    fetcher.close()

    if all_results:
        final = pd.concat(all_results, ignore_index=True)

        # Arrange columns nicely
        cols_order = ["ERN", "DSA", "OOP", "OS", "SAPM", "WT-I", "SGPA"]
        final = final[[col for col in cols_order if col in final.columns]]

        final.to_excel("student_results.xlsx", index=False)

        print("\n📁 Saved student_results.xlsx")
        print(final)

    else:
        print("❌ No results collected")


if __name__ == "__main__":
    main()