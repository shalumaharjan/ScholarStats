from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

def open_website(student):
    driver = webdriver.Chrome()

    # Open website
    driver.get("https://exam.pu.edu.np:9094/")  # 👉 Replace with your real result website

    time.sleep(2)

    # Fill Symbol Number (FIXED)
    driver.find_element(By.NAME, "Symbol_Number").send_keys(student["symbol_no"])

    # Fill DOB (change name if needed after inspect)
    dob_field = driver.find_element(By.NAME, "DOB")
    dob_field.clear()
    dob_field.send_keys(student["dob"])

    # Click submit (change if needed)
    driver.find_element(By.XPATH, "//button[@type='submit']").click()

    time.sleep(5)

    driver.quit()