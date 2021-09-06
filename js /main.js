let userNmeInput = document.querySelector(".username-input");
let signUpBtn = document.querySelector(".start-btn");
function signUp(){
    if(userNmeInput.value == ""){
        alert("Please enter your name")
    }
    else{
        localStorage.setItem("userName",userNmeInput.value)
        window.location.href="./html/qustions-page.html"
    }
}
signUpBtn.addEventListener("click", signUp)