let title = localStorage.getItem("title");

$(function () {
  get_Detail();

  get_comments();
});

function get_Detail(){
  $.ajax({
  type: "POST",
  url: "/find/detail",
  data: { title_give: title },
  success: function (response) {
    let movie_data = response["movie_data"];
    let poster = movie_data["img_url"];
    let title = movie_data["title"];
    let score = movie_data["score"];
    let desc = movie_data["desc"];
    let url = movie_data["url"];
    let genre = movie_data["genre"];
    let temp_html = `<div class="content detail">
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
                          `;

    $("#movie_detail").append(temp_html);
  },
});
}
function get_comments() {
  $("#comment-list").empty();

  $.ajax({
    type: "POST",
    url: "/comments/read",
    data: { title_give: title },
    success: function (response) {
      let comment_list = response["comment_list"];
      console.log(comment_list);
      
        for(let i = 0 ; i< comment_list.length; i++){

          let username = comment_list[i].username;
          let comment  = comment_list[i].comment; 
    
        let temp_html = `<div id="comment-item">
                            <article class="media">
                              <figure class="media-left" style="margin: 1rem 2rem">
                                <p class="image is-64x64">
                                  <i class="fas fa-user" style="font-size: 48px"></i>
                                </p>
                              </figure>
                              <div class="media-content" id="review">
                                <div class="content">
                                  <p>
                                    <strong>${username}</strong>
                                    <br />
                                    ${comment}
                                  </p>
                                </div>
                              </div>
                              <div class="media-right">
                                <button class="delete" onclick="delete_comment()"></button>
                              </div>
                            </article>
                        </div>`
    
        $("#comment-list").append(temp_html);
      }
    },
  });

}

function add_comment() {
  let username = sessionStorage['username'] ;
  let comment = $("#new-post").val();

  $.ajax({
    type: "POST",
    url: "/comments/write",
    data: { title_give: title, user_give: username, comment_give:comment },
    success: function (response) {

      let comment_data = response["comment_data"];
      console.log(comment_data);

      let username = comment_data[0];
      let comment  = comment_data[1]; 
    
      let temp_html = `<div id="comment-item">
                            <article class="media">
                              <figure class="media-left" style="margin: 1rem 2rem">
                                <p class="image is-64x64">
                                  <i class="fas fa-user" style="font-size: 48px"></i>
                                </p>
                              </figure>
                              <div class="media-content" id="review">
                                <div class="content">
                                  <p>
                                    <strong>${username}</strong>
                                    <br />
                                    ${comment}
                                  </p>
                                </div>
                              </div>
                              <div class="media-right">
                                <button class="delete" onclick="delete_comment()"></button>
                              </div>
                            </article>
                        </div>`  
    
        $("#comment-list").append(temp_html);
    },
  });
  
}


function delete_comment(){

}