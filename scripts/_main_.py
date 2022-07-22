from dotenv import load_dotenv
import os 
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep

# load .env
load_dotenv()

id = os.environ.get('ID')
password = os.environ.get('PASSWORD')

url_mainpage = "https://aws.fitcloud.co.kr/dashboard"

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.implicitly_wait(10)

driver.get(url_mainpage)

driver.find_element(by='id', value='loginUserId').send_keys(id)
driver.find_element(by='id', value='loginPassword').send_keys(password)
driver.find_element(by='id', value='kt_login_signin_submit').click()

sleep(5)

nowMonthCost = driver.find_element(by='id', value='nowMonthCost')

print(nowMonthCost.text)