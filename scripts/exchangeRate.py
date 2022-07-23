import json
from bs4 import BeautifulSoup
import requests

file_path = './exchangeRate.json'

page = "https://finance.naver.com/marketindex/"

res = requests.get(page)

soup = BeautifulSoup(res.text, "html.parser")
KRW = round(float(soup.select_one("div.head_info > span.value").text.replace(",","")))

print(round(KRW))

data = {}
data['KRW'] = KRW

with open(file_path, 'w') as outfile:
    json.dump(data, outfile, indent=2)