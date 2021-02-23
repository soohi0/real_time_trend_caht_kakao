import requests
from bs4 import BeautifulSoup
import json

pann_talk = "https://pann.nate.com/talk"
pann_talk_html = requests.get(pann_talk)
pann_talk_html_list =  BeautifulSoup(pann_talk_html.content ,"html.parser" ,from_encoding='utf=8')

pann_rank_list = pann_talk_html_list.select('#talkerChoiceArea0 > li > a')[:10]

k = 0
pannList = []
for i in pann_rank_list:
    k += 1
    temp = []
    # pannList = pannList + (k, '위 : ',i["title"], '(https://pann.nate.com'+i["href"],')')
    temp.append(str(k))
    temp.append(i["title"])
    pannList.append(temp)


with open('./data/natePann.json', 'w', encoding='utf-8') as f:
    json.dump(pannList, f, ensure_ascii=False, indent=1)