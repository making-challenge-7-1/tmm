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

      for (let i = 0; i < movieList.length; i++) {
        let poster = movieList[i]["img_url"];
        let title = movieList[i]["title"];

        let movie_item = `<div class="column is-2 is-narrow movie-card">
                            <div class="card">
                              <div class="card-image">
                                <a href="/detail" onclick="getMovieInfo('${title}')">
                                  <figure class="image card-mg">
                                    <img src="${poster}" alt="${title}" style="width:160px">
                                  </figure>
                                </a>
                              </div>
                            </div>
                          </div>`;

        $("#movie-list-all").append(movie_item);
      }
    },
  });
}

function get_movies_by_abc() {
  $("#movie-list-all").empty();

  $.ajax({
    type: "GET",
    url: "/find/all/abc",
    data: {},
    success: function (response) {
      let movieList = response["movie_list"];

      for (let i = 0; i < movieList.length; i++) {
        let poster = movieList[i]["img_url"];
        let title = movieList[i]["title"];

        let movie_item = `<div class="column is-2 is-narrow movie-card">
                            <div class="card">
                              <div class="card-image">
                                <a href="/detail" onclick="getMovieInfo('${title}')">
                                  <figure class="image card-mg">
                                    <img src="${poster}" alt="${title}" style="width:160px">
                                  </figure>
                                </a>
                              </div>
                            </div>
                          </div>`;

        $("#movie-list-all").append(movie_item);
      }
    },
  });
}

function getMovieInfo(title) {
  localStorage.setItem("title", title);
}
