function submitbtn(){
    validateEmail();
    validatePassword();
};

function validateEmail(){
    var email = document.getElementById("form2Example1").value;
    var emailReg = /^[a-z0-9._-]+@[a-z]+.[a-z.]{2,5}$/i;
    if( email == '' ){
        alert("Please enter your email address.");
        document.getElementById("form2Example1").focus();
        return false;
    }else if( !emailReg.test( email ) ){
        alert("Invalid email address.");
        document.getElementById("form2Example1").focus();
        return false;
    }else{
        return true;
    }
}

function validatePassword(){
    var password = document.getElementById("form2Example2").value;
    var passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if( password == '' ){
        alert("Please enter your password.");
        document.getElementById("form2Example2").focus();
        return false;
    }else if( !passwordReg.test( password ) ){
        alert("Invalid password.");
        document.getElementById("form2Example2").focus();
        return false;
    }
    else{
        return true;
    }
}

function showpassword(){
    var x = document.getElementById("form2Example2");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
};