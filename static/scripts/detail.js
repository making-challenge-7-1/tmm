let title = localStorage.getItem("title");
let ID = sessionStorage.getItem("username");

$(document).ready(() => {
  get_detail();
  get_comments();
});

//영화 정보 가져오기
function get_detail() {
  $.ajax({
    type: "POST",
    url: "/find",
    data: { title_give: title },
    success: function (response) {
      let movie_data = response["movie_data"];
      console.log(movie_data);

      let poster = movie_data["img_url"];
      let title = movie_data["title"];
      let score = movie_data["score"];
      let desc = movie_data["desc"];
      let url = movie_data["url"];
      let genre = movie_data["genre"];

      let temp_html = `<div class="content detail is-mobile">
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
//comment 받아오기
function get_comments() {
  $("#comment-list").empty();

  $.ajax({
    type: "POST",
    url: "/comments",
    data: { title_give: title },
    success: function (response) {
      let comment_data = response["target_comments"];
      console.log(comment_data);

      for (let i = 0; i < comment_data.length; i++) {
        let ID = comment_data[i]["ID"];
        let comment = comment_data[i]["comment"];
        let temp_html = ``;
        if (ID == sessionStorage["username"]) {
          temp_html = `<div id="comment-item" style="margin: 20px 0">
                        <article class="media">
                          <figure class="media-left" style="margin: 1rem 2rem">
                            <p class="image is-64x64">
                              <i class="fas fa-user" style="font-size: 48px"></i>
                            </p>
                          </figure>
                          <div class="media-content" id="review">
                            <div class="content">
                              <p>
                                <strong>${ID}</strong>
                              </p>
                              <p id="comment_${i}">
                              ${comment}
                              </p>
                            </div>
                          </div>
                          <div class="media-right">
                            <button class="delete" onclick="delete_comment(${i})"></button>
                          </div>
                          
                        </article>
                      </div>`;
        } else {
          temp_html = `<div id="comment-item" style="margin: 20px 0">
                        <article class="media">
                          <figure class="media-left" style="margin: 1rem 2rem">
                            <p class="image is-64x64">
                              <i class="fas fa-user" style="font-size: 48px"></i>
                            </p>
                          </figure>
                          <div class="media-content" id="review">
                            <div class="content">
                              <p>
                                <strong>${ID}</strong>
                              </p>
                              <p>
                                ${comment}
                              </p>
                                
                            </div>
                          </div>
                          <div class="media-right">
                            <button class="delete is-hidden"></button>
                          </div>
                          
                        </article>
                      </div>`;
        }

        $("#comment-list").append(temp_html);
      }
    },
  });
}

function add_comment() {
  let comment = $("#new-post").val();
  $.ajax({
    type: "POST",
    url: "/comments/update",
    data: { title_give: title, ID_give: ID, comment_give: comment },
    success: function (response) {
      if (response["msg"] == "내용을 작성해주세요") {
        //내용이 없을경우
        alert(response["msg"]);
      } else {
        //ID가 없을경우 등록 안됨 but 모두 충족시 정상 작동
        alert(response["msg"]);
        window.location.reload();
      }
    },
  });
}

function cancel_comment() {
  document.getElementById("new-post").value = "";
}

function delete_comment(num) {
  console.log(num);
  // let del_comment = $("#comment_" + String(num)).text();
  // console.log(del_comment);

  $.ajax({
    type: "POST",
    url: "/comments/delete",
    data: { title_give: title, ID_give: ID },
    success: function () {
      get_comments();
      window.location.reload();
    },
  });
}
