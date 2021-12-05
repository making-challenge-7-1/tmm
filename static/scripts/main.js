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

      let happy_item = `<a href="/detail" onclick="getMovieInfo('${happyTitle}')"><figure class="image is-3by4"><img src="${happyImg}" alt="${happyTitle}"></figure></a>`;

      let angry_img = `<a href="/detail" onclick="getMovieInfo('${angryTitle}')"><figure class="image is-3by4"><img src="${angryImg}" alt="${angryTitle}"></figure></a>`;

      let sad_img = `<a href="/detail" onclick="getMovieInfo('${sadTitle}')"><figure class="image is-3by4"><img src="${sadImg}" alt="${sadTitle}"></figure></a>`;

      let move_img = `<a href="/detail" onclick="getMovieInfo('${moveTitle}')"><figure class="image is-3by4"><img src="${moveImg}" alt="${moveTitle}"></figure></a>`;

      $("#head-happy").append(happy_item);
      $("#head-angry").append(angry_img);
      $("#head-sad").append(sad_img);
      $("#head-move").append(move_img);
    },
  });
}

function getMovieList(genre) {
  console.log(genre);

  $("#movie-list").empty();

  $.ajax({
    type: "POST",
    url: "/recommend/list",
    data: { genre_name: genre },
    success: function (response) {
      
      let movieList = response["movie_list"];

      for (let i = 0; i < movieList.length; i++) {
        let poster = movieList[i]["img_url"];
        let title = movieList[i]["title"];
        let score = movieList[i]["score"];

        let movie_item = `<div class="column is-one-quarter">
                              <div class="card">
                                <a href="/detail" onclick="getMovieInfo('${title}')"><img src="${poster}" class="card-img poster" alt="poster"></a>
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
  }});

  showList();
}

function showList() {
  let recommend = document.getElementById("movie-recommend");
  let m_list = document.getElementById("movie-list");

  if (recommend.style.display == "none") {
    recommend.style.display = "block";
    m_list.style.display = "none";
  } else {
    recommend.style.display = "none";
    m_list.style.display = "flex";
  }
}

function getMovieInfo(title) {
  localStorage.setItem('title', title);
}