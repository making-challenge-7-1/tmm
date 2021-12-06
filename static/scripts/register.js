function sign_up(){
    let email = $().value
    let password = $().value
    $.ajax({
        type: "POST",
        url: "/register",
        data: { email_give: email,
              password_give: password },
        success: function (response)
        console.log(response)
}

