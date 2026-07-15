from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
import time
import json

class HeadlessResultChecker:
    def __init__(self, headless=True):
        """
        Initialize the result checker
        headless: True = no browser window, False = show browser
        """
        self.headless = headless
        self.driver = None
        self.setup_driver()
    
    def setup_driver(self):
        """Setup Chrome driver with headless option"""
        chrome_options = Options()
        
        if self.headless:
            print("🕶️ Running in HEADLESS mode (no browser window)")
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--window-size=1920,1080")
        else:
            print("🖥️ Running with browser window visible")
            chrome_options.add_argument("--start-maximized")
        
        # Common options for both modes
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.wait = WebDriverWait(self.driver, 10)
    
    def check_result(self, student_data):
        """
        Check results with headless browser
        
        student_data = {
            'symbol_no': '123456',
            'dob': '2000-01-15',
            'exam_type': 'Regular_Retake',
            'year': '2025',
            'session': 'Fall',
            'semester': '1st',
            'program': 'Bachelor of Computer Application'
        }
        """
        
        try:
            # Open website
            print("📡 Navigating to result portal...")
            self.driver.get("https://exam.pu.edu.np:9094/")
            
            # Wait for page load
            self.wait.until(EC.presence_of_element_located((By.ID, "Exam_Type")))
            
            # Fill form
            print("📝 Filling form fields...")
            
            # 1. Exam Type
            Select(self.driver.find_element(By.ID, "Exam_Type")).select_by_value(
                student_data.get('exam_type', 'Regular_Retake')
            )
            time.sleep(0.3)
            
            # 2. Year
            Select(self.driver.find_element(By.ID, "Year")).select_by_value(
                student_data.get('year', '2025')
            )
            time.sleep(0.3)
            
            # 3. Academic Session
            Select(self.driver.find_element(By.ID, "Academic_System")).select_by_value(
                student_data.get('session', 'Fall')
            )
            time.sleep(0.3)
            
            # 4. Semester
            Select(self.driver.find_element(By.ID, "Semester")).select_by_value(
                student_data.get('semester', '1st')
            )
            time.sleep(0.3)
            
            # 5. Program
            Select(self.driver.find_element(By.ID, "Program")).select_by_visible_text(
                student_data.get('program', 'Bachelor of Computer Application')
            )
            time.sleep(0.3)
            
            # 6. Symbol Number
            symbol_field = self.driver.find_element(By.ID, "Symbol_Number")
            symbol_field.clear()
            symbol_field.send_keys(student_data.get('symbol_no', ''))
            
            # 7. DOB
            dob_field = self.driver.find_element(By.ID, "DOB")
            dob_field.clear()
            dob_field.send_keys(student_data.get('dob', ''))
            
            # 8. Submit
            print("📤 Submitting form...")
            self.driver.find_element(By.XPATH, "//input[@type='submit' and @value='Submit']").click()
            
            # Wait for results
            time.sleep(3)
            
            # Check if results loaded
            try:
                # Look for result content
                result_content = self.wait.until(
                    EC.presence_of_element_located((By.ID, "contentplaceholder"))
                )
                
                # Get result text
                result_text = result_content.text
                
                if result_text and len(result_text.strip()) > 0:
                    print("✅ Results loaded successfully!")
                    
                    # Take screenshot in headless mode (for debugging)
                    if self.headless:
                        self.driver.save_screenshot("result_screenshot.png")
                        print("📸 Screenshot saved as 'result_screenshot.png'")
                    
                    return {
                        'success': True,
                        'html': self.driver.page_source,
                        'text': result_text,
                        'url': self.driver.current_url
                    }
                else:
                    print("⚠️ No result content found")
                    return {'success': False, 'error': 'No result content'}
                
            except Exception as e:
                print(f"❌ Could not find results: {e}")
                
                # Check for error messages
                error_msg = self.driver.find_elements(By.CLASS_NAME, "text-danger")
                if error_msg:
                    print(f"📌 Error message: {error_msg[0].text}")
                
                # Take screenshot for debugging
                self.driver.save_screenshot("error_screenshot.png")
                print("📸 Error screenshot saved as 'error_screenshot.png'")
                
                return {'success': False, 'error': str(e)}
                
        except Exception as e:
            print(f"❌ Error: {e}")
            return {'success': False, 'error': str(e)}
    
    def close(self):
        """Close the driver"""
        if self.driver:
            self.driver.quit()
            print("🔒 Browser closed")

def main():
    """Main function"""
    
    # Student data - REPLACE WITH ACTUAL VALUES
    student = {
        "symbol_no": "24530090",  # ← REPLACE with actual exam roll number
        "dob": "03-14-2004",     # ← REPLACE with actual DOB (MM-DD-YYYY)
        "exam_type": "Regular_Retake",
        "year": "2025",
        "session": "Fall",
        "semester": "3rd",
        "program": "Bachelor of Computer Application"
    }
    
    print("🚀 PU Result Checker")
    print("="*50)
    
    # Try with headless mode first
    checker = HeadlessResultChecker(headless=True)
    result = checker.check_result(student)
    
    if result and result.get('success'):
        print("\n📋 RESULT SUMMARY")
        print("="*50)
        print(result.get('text', '')[:] + "...")  # Show first 500 chars
        print("="*50)
    else:
        print("\n❌ Failed to get results")
        
        # Ask if user wants to try with visible browser
        try:
            retry = input("\n🔄 Try with visible browser? (y/n): ").lower()
            if retry == 'y':
                checker.close()
                checker = HeadlessResultChecker(headless=False)
                result = checker.check_result(student)
                if result and result.get('success'):
                    print("\n📋 RESULT SUMMARY")
                    print("="*50)
                    print(result.get('text', '')[:500] + "...")
                    print("="*50)
        except:
            pass
    
    checker.close()
    print("\n✅ Done!")

if __name__ == "__main__":
    main()
