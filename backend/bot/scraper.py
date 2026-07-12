from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def scrape_result(driver):
    wait = WebDriverWait(driver, 10)

    data = {}

    # 🟢 Student Info
    data["student_name"] = driver.find_element(By.XPATH, "//b[contains(text(),'Student Name')]/following::text()[1]")

    # Alternative safe way
    info_section = driver.find_element(By.XPATH, "//div[contains(@class,'result')]").text
    data["info"] = info_section

    # 🟢 Table Rows
    rows = wait.until(
        EC.presence_of_all_elements_located((By.XPATH, "//table/tbody/tr"))
    )

    subjects = []

    for row in rows:
        cols = row.find_elements(By.TAG_NAME, "td")

        if len(cols) >= 5:
            subjects.append({
                "code": cols[1].text,
                "course": cols[2].text,
                "credit": cols[3].text,
                "grade": cols[4].text
            })

    data["subjects"] = subjects

    # 🟢 SGPA
    sgpa_text = driver.find_element(By.XPATH, "//*[contains(text(),'SGPA')]").text
    data["sgpa"] = sgpa_text.split("=")[-1].strip()

    return data