function getMovieInfo(title) {
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
      
      let temp_html =`<div>
                            <input type="image" src="${poster}" width="202" height="290" style="float: right"/>
                          </div>
                          <div>
                            <h1>${title}</h1>
                            <p>영화 보러가기</p>
                            <p>장르: 로맨틱코미디</p>
                            <p>⭐️평점 ${score}</p>
                            <p>줄거리</p>
                            <P>${desc}</P>
                          </div>`
      
      $("#movie_detail").append(temp_html);   
    },
  });
  
  
}
