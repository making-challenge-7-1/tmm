$(function () {
  get_movies_by_score();
});

function get_movies_by_score() {
  $("#movie-list-all").empty();

  $.ajax({
    type: "GET",
    url: "/find/all/score",
    data: {},
    success: function (response) {
      let movieList = response["movie_list"];
      showMovieList(movieList);
    },
  });
}

function get_movies_by_abc() {
  $.ajax({
    type: "GET",
    url: "/find/all/abc",
    data: {},
    success: function (response) {
      let movieList = response["movie_list"];
      showMovieList(movieList);
    },
  });
}

function search_movie() {
  let search_title = $("#search-movie-title").val();
  console.log(search_title);

  $("#movie-list-all").empty();
  $.ajax({
    type: "POST",
    url: "/find/movie",
    data: { title_give: search_title },
    success: function (response) {
      let movieList = response["movie_list"];
      let len = movieList.length;

      console.log(len);

      if (len == 0) {
        let movie_item = `<div class="content" style="text-align:center;height:300px"><h3>이런, 표시할 영화가 없네요.<br/>다시 검색해보세요.</h3></div>`;

        $("#movie-list-all").append(movie_item);
      } else {
        showMovieList(movieList);
      }
    },
  });
}

function showMovieList(movieList) {
  $("#movie-list-all").empty();

  for (let i = 0; i < movieList.length; i++) {
    let poster = movieList[i]["img_url"];
    let title = movieList[i]["title"];

    let movie_item = `<div class="column is-3 movie-card">
                            <a href="/detail" onclick="getMovieInfo('${title}')">
                              <div class="movie-top">
                                <figure class="image card-mg">
                                  <img src="${poster}" alt="${title}" class="poster">
                                </figure>
                              </div>
                            </a>
                      </div>`;

    $("#movie-list-all").append(movie_item);
  }
}

function getMovieInfo(title) {
  localStorage.setItem("title", title);
}
