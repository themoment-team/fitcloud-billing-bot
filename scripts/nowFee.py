from dotenv import load_dotenv
import os 
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep
import json
import sys

file_path = './nowFee.json'

# load .env
load_dotenv()

# id = os.environ.get('ID')
# password = os.environ.get('PASSWORD')

id = sys.argv[1]
password = sys.argv[2]

url_mainpage = "https://aws.fitcloud.co.kr/dashboard"

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument("--single-process")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

driver.get(url_mainpage)

driver.find_element(by='id', value='loginUserId').send_keys(id)
driver.find_element(by='id', value='loginPassword').send_keys(password)
driver.find_element(by='id', value='kt_login_signin_submit').click()

sleep(5)

nowMonthCost = driver.find_element(by='id', value='nowMonthCost')

fee = { "FEE": float(nowMonthCost.text.split('$')[1].replace(',','')) }

with open(file_path, 'w') as outfile:
    json.dump(fee, outfile, indent=2)