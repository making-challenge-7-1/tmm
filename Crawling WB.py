from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

# client = MongoClient('mongodb://test:test@localhost', 27017)
client = MongoClient('localhost', 27017)
db = client.dbchallenge

import requests
from bs4 import BeautifulSoup

months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
tggenres = ["19","11","5","16","8","18","2"]
for year in range(17, 22):
    for month in months:
        for tggenre in tggenres:
            headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
            data = requests.get('https://movie.naver.com/movie/sdb/rank/rmovie.naver?sel=cnt&date=20'+str(year)+str(month)+'01&tg='+str(tggenre),headers=headers)
            soup = BeautifulSoup(data.text, 'html.parser')

            if tggenre == "19":
                genre = "액션"
            elif tggenre == "11":
                genre = "코미디"
            elif tggenre == "5":
                genre = "맬로/애정/로맨스"
            elif tggenre == "16":
                genre = "범죄"
            elif tggenre == "8":
                genre = "느와르"
            elif tggenre == "18":
                genre = "SF"
            elif tggenre == "2":
                genre = "판타지"
            else:
                break

            trs = soup.select('#old_content > table > tbody > tr')                      #드1-2, 판2-3, 공4-4, 맬5-5, 코11-10, 액19-18

            rank = 0
            for tr in trs:
                a_page = tr.select_one('td.title > div > a')
                if a_page is not None: #타이틀이 있는경우
                    title = a_page.text #제목
                    url = tr.select_one('td.title > div > a')['href']
                    if rank == 10: #순위 10위까지
                        rank = 0
                        break #동작 중지
                    else: #해당 데이터일 경우 값일경우
                        movie = db.movies.find_one({'title': title}) #DB에서 title 검색
                        if movie == None:
                            movieurl = 'https://movie.naver.com'+url #영화 url선언
                            headers = {'User-Agent': 'Mozilla / 5.0(WindowsNT10.0;Win64;x64)AppleWebKit / 537.36(KHTML, likeGecko) Chrome / 73.0.3683.86Safari / 537.36'}
                            data = requests.get('https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=영화'+str(title),headers=headers)
                            soup = BeautifulSoup(data.text, 'html.parser')
                            try:
                                image_url = soup.select_one('div.detail_info > a > img')['src']
                                score = soup.select_one('div.cm_info_box > div.detail_info > dl > div:nth-child(3) > dd').text
                            except Exception as e:
                                continue

                            headers = {'User-Agent': 'Mozilla / 5.0(WindowsNT10.0;Win64;x64)AppleWebKit / 537.36(KHTML, likeGecko) Chrome / 73.0.3683.86Safari / 537.36'}
                            data = requests.get('https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=영화'+str(title)+'정보', headers=headers)
                            soup = BeautifulSoup(data.text, 'html.parser')
                            try:
                                summary = soup.select_one('div > div.intro_box._content > p').text
                            except Exception as e:
                                continue

                            doc = {'title': title, "score": score, 'genre1': genre,'genre2': "",'genre3': "", 'url':movieurl, "img_url": image_url, "summary": summary}
                            # doc = {'title': title, "summary": summary, 'score': score, 'genre1': genre,'genre2': "",'genre3': "","img_url": image_url}
                            db.movies.insert_one(doc)
                            rank = rank + 1
                            # print(doc, rank)
                        elif movie['genre1'] != genre and movie['genre2'] == "":
                            db.movies.update_one({'title': title}, {'$set': {'genre2': genre}})
                            rank = rank + 1
                        elif movie['genre1'] != genre and movie['genre2'] != "" and movie['genre2'] != genre and movie['genre3'] == "":
                            db.movies.update_one({'title': title}, {'$set': {'genre3': genre}})
                            rank = rank + 1
                        else:
                            pass

                else:
                    pass
print("success")