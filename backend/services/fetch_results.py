# This is related with the config/settings.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from config.settings import settings


class HeadlessResultChecker:
    def __init__(self, headless=True):
        self.options = webdriver.ChromeOptions()

        if headless:
            self.options.add_argument("--headless=new")

        self.options.add_argument("--no-sandbox")
        self.options.add_argument("--disable-dev-shm-usage")

        self.driver = webdriver.Chrome(
            options=self.options
        )

        self.wait = WebDriverWait(
            self.driver,
            settings.TIMEOUT
        )

    def check_result(self, student_data):
        try:
            self.driver.get(settings.LOGIN_URL)

            # Example (you must adjust IDs based on real site)
            self.wait.until(EC.presence_of_element_located((By.NAME, "symbol_no"))).send_keys(student_data["symbol_no"])

            self.driver.find_element(By.NAME, "dob").send_keys(student_data["dob"])

            self.driver.find_element(By.NAME, "submit").click()

            # Wait for result
            result_element = self.wait.until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )

            return {
                "status": "success",
                "data": result_element.text
            }

        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }

    def close(self):
        self.driver.quit()


# 🔥 This is what FastAPI will use
def check_single_result(student_data):
    checker = HeadlessResultChecker(headless=settings.HEADLESS)

    try:
        result = checker.check_result(student_data)
        return result
    finally:
        checker.close()