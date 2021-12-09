function sign_in() {
  let username = $("#input-username").val();
  let password = $("#input-password").val();

  if (username == "") {
    $("#help-id-login").text("아이디를 입력해주세요.");
    $("#input-username").focus();
    return;
  } else {
    $("#help-id-login").text("");
  }
  
  if (password == "") {
    $("#help-password-login").text("비밀번호를 입력해주세요.");
    $("#input-password").focus();
    return;
  } else {
    $("#help-password-login").text("");
  }
  $.ajax({
    type: "POST",
    url: "/sign_in",
    data: {
      username_give: username,
      password_give: password,
    },
    success: function (response) {
      if (response["result"] == "success") {
        sessionStorage.setItem('username', username)
        alert("로그인 성공!");
        window.location.replace("/");
      } else {
        alert(response["msg"]);
      }
    },
  });
}

function to_sign_up() {
  window.location.href("/register");
}
