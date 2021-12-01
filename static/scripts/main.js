$(document).ready(() => {
  getRecommendList();
});

function getRecommendList() {
  $.ajax({
    type: "GET",
    url: "/recommend/top",
    data: {},
    success: function (response) {
      console.log(response);

      let happy_img = `<img src="" alt="" class="movie-card-poster"
                onclick="showDetail()">`;

      let angry_img = `<img src="" alt="" class="movie-card-poster"
                onclick="showDetail()">`;

      let sad_img = `<img src="" alt="" class="movie-card-poster"
                onclick="showDetail()">`;

      let move_img = `<img src="" alt="" class="movie-card-poster"
                onclick="showDetail()">`;

      $("#head-happy").append(happy_img);
      $("#head-angry").append(angry_img);
      $("#head-sad").append(sad_img);
      $("#head-move").append(move_img);
    },
  });
}

function getMovieList(genre) {
  $.ajax({
    type: "GET",
    url: "/recommend/list",
    data: { genre_name: genre },
    success: function (response) {
      console.log(response);

      let movieList = response["movie_list"];

      for (let i = 0; i < movieList.length; i++) {
        let poster = movieList[i]["img_url"];
        let title = movieList[i]["title"];
        let score = movieList[i]["score"];

        let movie_item = `<div class="column">
                              <div class="card">
                                <img src="${poster}" class="card-img poster" alt="poster" onclick="showDetail()">
                                <div class="card-body">
                                  <p class="card-text">
                                  <h3><strong>${title}</strong></h3>
                                  <span>평점: ${score} 점</span>
                                  </p>
                                </div>
                              </div>
                            </div>`;

        $("movie-list").append(movie_item);
      }
    },
  });

  showList();
}

function showList() {
  let recommend = document.getElementById("movie-recommend");
  let m_list = document.getElementById("movie-list");

  if (recommend.style.display == "none") {
    recommend.style.display = "flex";
    m_list.style.display = "none";
  } else {
    recommend.style.display = "none";
    m_list.style.display = "flex";
  }
}

function getMovieInfo(title) {
  $.ajax({
    type: "GET",
    url: "/detail",
    data: { movie_title: title },
    success: function (response) {
      console.log(response);
    },
  });
  showDetail();
}

function showDetail() {
  location.href = "/detail";
}
