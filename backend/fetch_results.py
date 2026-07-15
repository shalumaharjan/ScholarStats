from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

from io import StringIO
import pandas as pd
import time


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

        self.driver = webdriver.Chrome(
            options=options
        )

        self.wait = WebDriverWait(
            self.driver,
            20
        )


    def fetch_result(self, student):
        try:
            print(
                f"\n🔎 Checking ERN: {student['ern']}"
            )

            self.driver.get(
                "https://exam.pu.edu.np:9094/"
            )

            self.wait.until(
                EC.presence_of_element_located(
                    (By.ID, "Exam_Type")
                )
            )

            # Exam Type
            Select(
                self.driver.find_element(
                    By.ID,
                    "Exam_Type"
                )
            ).select_by_value(
                student["exam_type"]
            )


            # Year
            Select(
                self.driver.find_element(
                    By.ID,
                    "Year"
                )
            ).select_by_value(
                student["year"]
            )


            # Session
            Select(
                self.driver.find_element(
                    By.ID,
                    "Academic_System"
                )
            ).select_by_value(
                student["session"]
            )


            # Semester
            Select(
                self.driver.find_element(
                    By.ID,
                    "Semester"
                )
            ).select_by_value(
                student["semester"]
            )


            # Program
            Select(
                self.driver.find_element(
                    By.ID,
                    "Program"
                )
            ).select_by_visible_text(
                student["program"]
            )


            # ERN / Symbol Number
            symbol = self.driver.find_element(
                By.ID,
                "Symbol_Number"
            )

            symbol.clear()

            symbol.send_keys(
                student["ern"]
            )


            # DOB
            dob = self.driver.find_element(
                By.ID,
                "DOB"
            )

            dob.clear()

            # format MM-DD-YYYY
            dob.send_keys(
                student["dob"]
            )

            print("📤 Submitting result request...")

            self.driver.find_element(
                By.XPATH,
                "//input[@type='submit']"
            ).click()

            # wait for AJAX
            time.sleep(8)
            html = self.driver.page_source
            tables = pd.read_html(
                StringIO(html)
            )


            print(
                "Tables found:",
                len(tables)
            )
            if len(tables) == 0:
                print(
                    "❌ No table found"
                )
                return None

            # Usually last table is result
            result = tables[-1]
            print(
                result.head()
            )


            # Clean column names
            result.columns = [
                str(col).strip()
                for col in result.columns
            ]

            # Rename actual portal columns
            rename_map = {
                "Object Oriented Programming using Java":
                    "OOP",
                "Data Structure and Algorithms":
                    "DSA",
                "System Analysis and Project Management":
                    "SAPM",
                "Web Technologies I":
                    "WT-I",
                "Operating System":
                    "OS",
                "Semester GPA":
                    "SGPA"

            }
            result.rename(
                columns=rename_map,
                inplace=True
            )

            # Add ERN
            result.insert(
                0,
                "ERN",
                student["ern"]
            )

            # Required output columns
            required = [
                "ERN",
                "Name",
                "OOP",
                "DSA",
                "SAPM",
                "WT-I",
                "OS",
                "SGPA"

            ]

            available = [
                col
                for col in required
                if col in result.columns
            ]

            # Convert subject rows into columns
            subject_map = {
                "Object Oriented Programming using Java": "OOP",
                "Data Structure and Algorithms": "DSA",
                "System Analysis and Project Management": "SAPM",
                "Web Technologies I": "WT-I",
                "Operating System": "OS"
            }
            result["Course Title"] = result["Course Title"].str.strip()
            result["Course Title"] = result["Course Title"].replace(
                subject_map
            )

            # Convert rows to columns
            result = result.pivot_table(
                index=[],
                columns="Course Title",
                values="Grade",
                aggfunc="first"
            ).reset_index(drop=True)

            # Add ERN
            result.insert(
                0,
                "ERN",
                student["ern"]
            )



            # Calculate SGPA if portal provides it later

            result["SGPA"] = ""


            print(
                f"✅ Completed {student['ern']}"
            )


            return result


        except Exception as e:
            print(
                f"❌ Error {student['ern']}: {e}"
            )
            return None


    def close(self):

        if self.driver:

            self.driver.quit()


def main():
    students = [
        {
            "ern": "24530044",
            "dob": "12-01-2005",
            "exam_type":
                "Regular_Retake",
            "year":
                "2025",
            "session":
                "Fall",
            "semester":
                "3rd",
            "program":
                "Bachelor of Computer Application"
        },
        {
            "ern": "24530090",
            "dob": "03-14-2004",
            "exam_type":
                "Regular_Retake",
            "year":
                "2025",
            "session":
                "Fall",
            "semester":
                "3rd",
            "program":
                "Bachelor of Computer Application"
        }

    ]



    fetcher = ResultFetcher(
        headless=False
    )

    all_results = []


    for student in students:
        result = fetcher.fetch_result(
            student
        )
        if result is not None:
            all_results.append(
                result
            )

    fetcher.close()

    if all_results:
        final = pd.concat(
            all_results,
            ignore_index=True
        )
        final.to_excel(
            "student_results.xlsx",
            index=False
        )
        print(
            "\n📁 Saved student_results.xlsx"
        )
        print(final)
    else:
        print(
            "❌ No results collected"
        )

if __name__ == "__main__":

    main()