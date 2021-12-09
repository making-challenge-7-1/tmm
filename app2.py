from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

# client = MongoClient('mongodb://test:test@localhost', 27017)
client = MongoClient('localhost', 27017)
db = client.dbchallenge

import requests
from bs4 import BeautifulSoup

months = {"01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"}
# tggenres = {"19","11","5","16","8","18","2"}
for year in range(20, 21):
    for month in months:
        for tggenre in range(1, 19):
            headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
            data = requests.get('https://movie.naver.com/movie/sdb/rank/rmovie.naver?sel=cnt&date=20'+str(year)+str(month)+'01&tg='+str(tggenre),headers=headers)
            soup = BeautifulSoup(data.text, 'html.parser')

            trs = soup.select('#old_content > table > tbody > tr')                      #드1-2, 판2-3, 공4-4, 맬5-5, 코11-10, 액19-18
            # if tggenre == 19:
            #     genre = "액션"
            # elif tggenre == 11:
            #     genre = "코미디"
            # elif tggenre == 5:
            #     genre = "맬로/애정/로맨스"
            # elif tggenre == 16:
            #     genre = "범죄"
            # elif tggenre == 8:
            #     genre = "느와르"
            # elif tggenre == 18:
            #     genre = "SF"
            # elif tggenre == 2:
            #     genre = "판타지"

            genre = soup.select_one('#old_content > h4 > div > select > option:nth-child(2)').text #장르
            rank = 0
            for tr in trs:
                a_page = tr.select_one('td.title > div > a')
                if a_page is not None: #타이틀이 있는경우
                    title = a_page.text #제목
                    # rank = tr.select_one('td:nth-child(1) > img')['alt'] #순위
                    url = tr.select_one('td.title > div > a')['href']
                    # print("movie.naver.com"+url)
                    if rank == 10: #순위 10위까지
                        rank = 0
                        break #동작 중지
                    else: #해당 데이터일 경우 값일경우
                        # c_tag = tr
                        movie = db.moviess.find_one({'title': title}) #DB에서 title 검색
                        if movie == None:
                            movieurl = 'https://movie.naver.com'+url #영화 url선언
                            headers = {'User-Agent': 'Mozilla / 5.0(WindowsNT10.0;Win64;x64)AppleWebKit / 537.36(KHTML, likeGecko) Chrome / 73.0.3683.86Safari / 537.36'}
                            data = requests.get('https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query='+str(title)+"정보",headers=headers)
                            soup = BeautifulSoup(data.text, 'html.parser')
                            try:
                                image_url = soup.select_one('div.detail_info > a > img')['src']
                                summary = soup.select_one('div.detail_info > a')['href']
                            except Exception as e:
                                continue
                            # main_pack > div.sc_new.cs_common_module.case_empasis.color_8._au_movie_content_wrap > div.cm_content_wrap > div.cm_content_area._cm_content_area_synopsis > div > div.intro_box._content > p
                            # main_pack > div.sc_new.cs_common_module.case_empasis.color_16._au_movie_content_wrap > div.cm_content_wrap > div.cm_content_area._cm_content_area_synopsis > div > div.intro_box._content > p
                            # main_pack > div.sc_new.cs_common_simple._au_movie_content_wrap > div.cm_content_wrap > div > div.cm_info_box > div.detail_info > div.text_expand._ellipsis > span

                            # img_url = soup.select_one('div.detail_info > a > img')['src']
                            # url = soup.select_one('div.detail_info > a')['href']

                            # doc = {'title': title, 'genre1': genre,'genre2': "",'genre3': "", 'url':movieurl}
                            doc = {'title': title, 'genre1': genre,'genre2': "",'genre3': "","img_url": image_url, "summary": summary}
                            # db.movies.insert_one(doc)
                            rank = rank + 1
                            print(doc, rank)
                        elif movie['genre1'] != genre and movie['genre2'] == "":
                            db.movies.update_one({'title': title}, {'$set': {'genre2': genre}})
                            rank = rank + 1
                        elif movie['genre1'] != genre and movie['genre2'] != "" and movie['genre2'] != genre and movie['genre3'] == "":
                            db.movies.update_one({'title': title}, {'$set': {'genre3': genre}})
                            rank = rank + 1
                        else:
                            print(title, rank, genre)

                else:
                    pass
print("success")

#old_content > table > tbody > tr:nth-child(2) > td.title > div > a
#old_content > table > tbody > tr:nth-child(3) > td.title > div > a

#old_content > table > tbody > tr:nth-child(2) > td:nth-child(1) > img
#old_content > table > tbody > tr:nth-child(13) > td:nth-child(1) > img

#old_content > h4 > div > select > option:nth-child(2) = 드라마
#old_content > h4 > div > select > option:nth-child(3) = 판타지
#old_content > h4 > div > select > option:nth-child(4) = 공포
#old_content > h4 > div > select > option:nth-child(5) = 멜로/애정/로맨스
#old_content > h4 > div > select > option:nth-child(10) = 코미디
#old_content > h4 > div > select > option:nth-child(18) = 액션
