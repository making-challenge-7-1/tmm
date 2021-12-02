$(document).ready(() => {
  getMovieInfo(title);
});

function getMovieInfo(title) {
  $.ajax({
    type: "POST",
    url: "/detail",
    data: { movie_title: title },
    success: function (response) {
      console.log(response);
    },
  });
//   showDetail();
}
