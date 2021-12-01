from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)


client = MongoClient("localhost", 27017)

db = client.dbMovie

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

    try:
        target = db.MovieList.find_one()

    except Exception:

        return jsonify({"error"})

    return jsonify({"test"})


# get all movie by genre
@app.route("/recommend/list", methods=["GET"])
def get_recommend_list():
    try:
        target = db.MovieList.find()

    except Exception:

        return jsonify({"error"})

    return jsonify({"movie list"})


@app.route("/detail", methods=["GET"])
def get_movie_detail():
    try:
        title_receive = request.form["title_give"]
        target = db.MovieList.find_one({"name": title_receive}, {"_id": False})

    except Exception as e:
        return {"message": "failed to search"}, 401

    return {"movie_data": target}, 200


if __name__ == "__main__":

    app.run("0.0.0.0", port=5000, debug=True)
