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

function getMovieList(){
  $.ajax({
    type:"GET",
    url: "/recommend/list",
    data: {
      // 영화 장르
    },
    success: function(response){
      console.log(response)

      let temp_html = `<div class="col">
                        <div class="card">
                          <img src="" class="card-img poster" alt="poster" onclick="showDetail()">
                          <div class="card-body">
                            <p class="card-text">
                              <h3><strong>엔칸토</strong></h3>
                              <span>평점: 00.00점</span>
                            </p>
                          </div>
                        </div>
                      </div>`

      $("#movie-list-all").append(temp_html);
      
    }
  })
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

function showDetail() {

  $.ajax({
    type:"GET",
    url: "/detail",
    data:{
      // 영화 제목

    },
    success: function(response){
      console.log(response);
    }
  })



  location.href = "/detail";
}
