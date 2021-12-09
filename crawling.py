import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pymongo import MongoClient
# client = MongoClient('mongodb://test:test@52.79.33.194', 27017)
client = MongoClient("mongodb://test:test@localhost", 27017)
db = client.dbMovies

from datetime import timedelta, date

dayArray = []
def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + timedelta(30 * n)

start_date = date(2021, 6, 1)
end_date = date(2021, 11, 2)
for single_date in daterange(start_date, end_date):
    if(int(single_date.strftime("%Y%m%d")) > int(datetime.today().strftime("%Y%m%d"))):
        continue
    dayArray.append(single_date.strftime("%Y%m%d"))

print(dayArray)
pagenumber = [2,5,8,16,18,19]
for date in dayArray:
    for page in pagenumber:
        headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
        data = requests.get('https://movie.naver.com/movie/sdb/rank/rmovie.naver?sel=cnt&date='+str(date)+'&tg='+str(page),headers=headers)
        soup = BeautifulSoup(data.text, 'html.parser')
        movies = soup.select('#old_content > table > tbody > tr')
        if(page ==19):
            genre = '신남'
        elif(page ==5):
            genre = '화남'
        elif(page ==8 or page == 16):
            genre = '우울'
        elif(page ==2 or page == 18):
            genre = '떠남'
        for movie in movies:
            a_tag = movie.select_one('td.title > div > a')
            if a_tag is not None:
                title = a_tag.text
                # 제목으로 desc, img_url, url 따오기
                data = requests.get(
                    'https://search.naver.com/search.naver?where=nexearch&sm=tab_jum&query='+ '영화' + title + '정보',
                    headers=headers)
                soup = BeautifulSoup(data.text, 'html.parser')
                oltitle = db.tp7.find_one({'title':title})
                # db에 처음 들어갈 때
                if oltitle == None:
                    try:
                        desc = soup.select_one('.intro_box').text
                        img_url = soup.select_one('div.detail_info > a > img')['src']
                        url = soup.select_one('div.detail_info > a')['href']
                    except Exception as e:
                        continue
                    # 평점 따오기
                    data = requests.get(
                        'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query='+'영화'+ title + '평점',
                        headers=headers)
                    soup = BeautifulSoup(data.text, 'html.parser')
                    try:
                        score = soup.select_one('.area_intro_info > span.area_star_number').text
                    except Exception as e:
                        continue
                    doc = {'title': title,
                           'score': score,
                           'desc': desc,
                           'img_url': img_url,
                           'url': url,
                           'genre': genre,
                           'genre2': '',
                           'genre3': '',
                           'genre4': ''
                           }
                    db.tp7.insert_one(doc)
                # 두 번째로 들어갈 때
                elif oltitle["genre"]!= genre and oltitle["genre2"]=='' and oltitle["genre3"]== '':
                    db.tp7.update_one({'title': title}, {'$set': {'genre2': genre}})
                # 세 번쨰로 들어갈 때
                elif oltitle["genre"]!=genre and oltitle["genre2"]!=genre and oltitle["genre3"]=='':
                    db.tp7.update_one({'title': title}, {'$set': {'genre3': genre}})
                # 네 번쨰로 들어갈 때
                elif oltitle["genre"]!=genre and oltitle["genre2"]!=genre and oltitle["genre3"]!=genre:
                    db.tp7.update_one({'title': title}, {'$set': {'genre4': genre}})
print('success')

