$(document).ready(() => {
  getRecommendList();
});

function getRecommendList() {
  $.ajax({
    type: "GET",
    url: "/recommend/top",
    data: {},
    success: function (response) {
      
      let recommendList = response["recommendTop"];
      let happyTitle = recommendList[0];
      let happyImg = recommendList[1];

      let angryTitle = recommendList[2];
      let angryImg = recommendList[3];

      let sadTitle = recommendList[4];
      let sadImg = recommendList[5];

      let moveTitle = recommendList[6];
      let moveImg = recommendList[7];

      let happy_item = `<a href="/detail" onclick="getMovieInfo('${happyTitle}')"><img src="${happyImg}" alt="${happyTitle}" class="movie-card-poster"></a>`;

      let angry_img = `<img src="${angryImg}" alt="${angryTitle}" class="movie-card-poster"
                onclick="showDetail('${angryTitle}')">`;

      let sad_img = `<img src="${sadImg}" alt="${sadTitle}" class="movie-card-poster"
                onclick="showDetail('${sadTitle}')">`;

      let move_img = `<img src="${moveImg}" alt="${moveTitle}" class="movie-card-poster"
                onclick="showDetail('${moveTitle}')">`;

      $("#head-happy").append(happy_item);
      $("#head-angry").append(angry_img);
      $("#head-sad").append(sad_img);
      $("#head-move").append(move_img);
    },
  });
}

function getMovieList(genre) {
  console.log(genre);

  $.ajax({
    type: "POST",
    url: "/recommend/list",
    // url: "#movie-list",
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

        $("#movie-list").append(movie_item);
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



