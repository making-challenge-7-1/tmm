from flask import( Flask, json, render_template, jsonify)
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


# top 4 movie get
@app.route("/recommend/top", methods=["GET"])
def get_recommend_top():

    try:
        target = db.dbMovie.find_one()
    
    except Exception:
        
        return jsonify({"error"})

    return jsonify({"test"})


# get all movie by genre
@app.route("/recommend/list", methods=["GET"])
def get_recommend_list():
    try:
        target = db.dbMovie.find_one()
    
    except Exception:
        
        return jsonify({"error"})

    return jsonify({"movie list"})


@app.route("/detail", methods=["GET"])
def get_movie_detail():

    return jsonify({"movie data"})


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)