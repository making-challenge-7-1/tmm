function logIn(){
  let ID = $('.inputID').val()
  let password = $('.inputPassword').val()
  $.ajax({
        type: "POST",
        url: "/logIn/check",
        data: {ID_give: ID, password_give:password},
        success: function (response){
          console.log(response)
          if(response["logIn_info"]===null){
            alert('ID를 확인해주세요!')
            return
          }
          let log_info = response["logIn_info"]
          let IDByDB = log_info["ID"]
          let passwordByDB = log_info["password"]
          if((ID === IDByDB)&&(password === passwordByDB)){
            localStorage.setItem('ID', ID)
          }else{
            alert('password를 확인해주세요!')
          }
          if(localStorage.getItem("ID")===ID){
            location.href = "/"
          }
        }
  })
}
