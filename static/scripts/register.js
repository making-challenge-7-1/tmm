function sign_up(){
    let ID = $('.inputID').val()
    let password1 = $('#input-password1').val()
    let password2 = $('#input-password2').val()
    if(ID===''){
        alert('id를 입력해주세요')
        return
    }
    else if(password1 === ''){
        alert('password를 입력해주세요')
        return
    }
    else if(password1 !== password2){
        alert('password가 다릅니다')
        return
    }

      $.ajax({
        type: "POST",
        url: "/register",
        data: { ID_give: ID,
              password_give: password1 },
        success: function (response){
        alert('테스트성공')
            }
})
    location.href ="/"
}
    
