let title = localStorage.getItem('title')
  console.log(title)

  $.ajax({
    type: "POST",
    url: "/find",
    data: { title_give: title},
    success: function (response) {

      let movie_data = response["movie_data"]
      console.log(movie_data);

      let poster = movie_data["img_url"];
      // console.log(poster);
      let title = movie_data["title"];
      let score = movie_data["score"];
      let desc  = movie_data["desc"];
      let url = movie_data["url"];
      let genre = movie_data["genre"];

      let temp_html =`<div class="content detail">
                            <input type="image" src="${poster}" width="202" height="290" style="float: left"/>
                            <div class="boxPadding">
                            <h1>${title}</h1>
                            <a href="${url}">영화 보러가기</a>
                            <p>장르: ${genre}</p>
                            <p>⭐️평점 ${score}</p>
                            <p>줄거리</p>
                            <P>${desc}</P>
                          </div>
                          </div>
                          `

      $("#movie_detail").append(temp_html);
    },
  });

