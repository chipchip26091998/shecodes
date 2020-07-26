function Validate(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if ( email == "username1@gmail.com" && password == "password1"){
        alert("Login successful")
        // location.replace('../index/index.html');
    } else{
        alert("Invalid username or password");
    }
    return false;
}
