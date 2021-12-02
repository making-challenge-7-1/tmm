from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

# client = MongoClient('mongodb://test:test@52.79.33.194', 27017)
# db = client.dbsparta

client = MongoClient("localhost", 27017)

db = client.dbMovie
movieList = db.tp7

# main page
@app.route("/")
def init():
    return render_template("index.html")


# detail page
@app.route("/detail")
def detail():
    return render_template("detail.html")


# top 4 movie get 기분별 하나씩 랜덤하게 가져오기
@app.route("/recommend/top", methods=["GET"])
def get_recommend_top():

    recommend_top = []

    try:
        happy_item = movieList.find_one({"genre": "신남"}, {"_id": False})
        # print(happy_item)
        happy_title = happy_item["title"]
        happy_img = happy_item["img_url"]
        recommend_top.append(happy_title)
        recommend_top.append(happy_img)
        # print(recommend_top)

        angry_item = movieList.find_one({"genre": "화남"}, {"_id": False})
        angry_title = angry_item["title"]
        angry_img = angry_item["img_url"]
        recommend_top.append(angry_title)
        recommend_top.append(angry_img)

        sad_item = movieList.find_one({"genre": "우울"}, {"_id": False})
        sad_title = sad_item["title"]
        sad_img = sad_item["img_url"]
        recommend_top.append(sad_title)
        recommend_top.append(sad_img)

        move_item = movieList.find_one({"genre": "떠남"}, {"_id": False})
        move_title = move_item["title"]
        move_img = move_item["img_url"]
        recommend_top.append(move_title)
        recommend_top.append(move_img)

    except Exception as e:

        return jsonify({"ERROR: fail to get top items"})

    return jsonify({"recommendTop": recommend_top})


# get all movie by genre
@app.route("/recommend/list", methods=["GET"])
def get_recommend_list():
    try:
        genre_receive = request.form["genre_name"]
        print(genre_receive)

        movie_list = list(movieList.find({"genre": genre_receive}), {"_id": False})

    except Exception:

        return jsonify({"error"})

    return jsonify({"movie list": movie_list})


# get movie detail
@app.route("/detail", methods=["GET"])
def get_movie_detail():
    try:
        title_receive = request.form["title_give"]
        target = movieList.find_one({"name": title_receive}, {"_id": False})

    except Exception as e:
        return {"message": "failed to search"}, 401

    return {"movie_data": target}, 200


if __name__ == "__main__":

    app.run("0.0.0.0", port=5000, debug=True)
