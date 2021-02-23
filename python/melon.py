# -*- Encoding: UTF-8 -*- #
# # 소스코드 - 자세한 사용법은 유튜브 영상을 참조하세요.
# 영상 제작 날짜 기준의 코드입니다. 이후 사이트 구조가 달라지거나 기타 이유로 작동하지 않을 수 있습니다.

import urllib.request
from bs4 import BeautifulSoup
import json

hdr = { 'User-Agent' : 'Mozilla/5.0' }
url = 'https://www.melon.com/chart/index.htm'

req = urllib.request.Request(url, headers=hdr)
html = urllib.request.urlopen(req).read()
soup = BeautifulSoup(html, 'html.parser')

lst100 = soup.select('#frm tbody tr')

melonList = []
index = 1
for i in lst100 :
    temp = []
    temp.append(index)
    temp.append(i.select_one('.ellipsis.rank02').a.text)
    temp.append(i.select_one('.ellipsis.rank03').a.text)
    melonList.append(temp)
    index = index + 1

# with open('melon100.csv','w',encoding='utf-8',newline='') as f:
#     writer = csv.writer(f)
#     writer.writerow(['순위','아티스트','곡명','앨범'])
#     writer.writerows(melonList)

# melonList = json.dumps(melonList)
# json_string = json.dumps(melonList)

with open('./data/melon.json', 'w', encoding='utf-8') as f:
    json.dump(melonList, f, ensure_ascii=False, indent=1)

# print(melonList[0:10])