from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

import random

app = Flask(__name__)

# client = MongoClient('mongodb://test:test@52.79.33.194', 27017)
# db = client.dbsparta

client = MongoClient("localhost", 27017)

db = client.dbMovie
movieList = db.tp7

app.secret_key = "ABCDEFG"

# main page view
@app.route("/")
def init():
    return render_template("index.html")


# detail page view
@app.route("/detail", methods=['GET'])
def detail():
    return render_template("detail.html")


# top 4 movie get 기분별 하나씩 랜덤하게 가져오기
@app.route("/recommend/top", methods=["GET"])
def get_recommend_top():

    recommend_top = []

    try:
        happy_list = list(movieList.find({"genre": "신남"}, {"_id": False}))
        today_happy = random.sample(happy_list, 1)[0]
        
        happy_title = today_happy["title"]
        happy_img = today_happy["img_url"]
        recommend_top.append(happy_title)
        recommend_top.append(happy_img)
        
        angry_list = list(movieList.find({"genre": "화남"}, {"_id": False}))
        today_angry = random.sample(angry_list, 1)[0]        
        angry_title = today_angry["title"]
        angry_img = today_angry["img_url"]
        recommend_top.append(angry_title)
        recommend_top.append(angry_img)

        sad_list = list(movieList.find({"genre": "우울"}, {"_id": False}))
        today_sad = random.sample(sad_list, 1)[0]        
        sad_title = today_sad["title"]
        sad_img = today_sad["img_url"]
        recommend_top.append(sad_title)
        recommend_top.append(sad_img)

        move_list = list(movieList.find({"genre": "떠남"}, {"_id": False}))
        today_move = random.sample(move_list, 1)[0]        
        move_title = today_move["title"]
        move_img = today_move["img_url"]
        recommend_top.append(move_title)
        recommend_top.append(move_img)

    except Exception as e:

        return jsonify({"ERROR: fail to get top items"})

    return jsonify({"recommendTop": recommend_top})


# get all movie by genre
@app.route("/recommend/list", methods=["POST"])
def get_recommend_list():
    try:
        genre_receive = request.form["genre_name"]
        # print(genre_receive)

        movie_list = list(movieList.find({"genre": genre_receive}, {"_id": False}))
        # print(movie_list)

    except Exception:

        return jsonify({"error"})

    return jsonify({"movie_list": movie_list})


# get movie detail
@app.route("/find", methods=["POST"])
def find_movie_detail():
    try:
        title_receive = request.form["title_give"]
        print(title_receive)

        target = movieList.find_one({"title": title_receive}, {"_id": False})
        print(target)


    except Exception as e:
        return {"message": "failed to search"}, 401

    return jsonify({"movie_data": target})


if __name__ == "__main__":

    app.run("0.0.0.0", port=5000, debug=True)
