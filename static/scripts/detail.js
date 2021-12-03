$(document).ready(() => {
  getMovieInfo(title);
});

function getMovieInfo() {
  $.ajax({
    type: "GET",
    url: "/detail",
    data: {},
    success: function (response) {
      alert(response("movie"))
      // let movie = response[0]
      // let title = movie['title'];
      // let score = movie['score'];
      // let desc = movie['desc'];
      // let img_url = movie['img_url'];
      // let url = movie['url'];
      // let genre = movie['genre'];
      //
      // let temp_html = `<div class="row">
      //                     <div class="col">
      //                       <input type="image" src="${img_url}" width="202" height="290" style="float: right">
      //                     </div>
      //                     <div class="col">
      //                       <h1>${title}</h1>
      //                       <p href="${url}">영화 보러가기</p>
      //                       <p>장르: ${genre}</p>
      //                       <p>⭐️평점: ${score}</p>
      //                       <p>${desc}</p>
      //                       </div>
      //                     </div>`
      //
      //                 $('#temp_html').append(temp_html);
    },
  });
//   showDetail();
}