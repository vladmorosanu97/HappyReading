function setUserInfo() {
    let username = document.getElementById('username-user').value;
    localStorage.setItem('username', username);
}
function setUserLogin() {
    let username = document.getElementById('input_username').value;
    localStorage.setItem('username', username);
}

function validateRegister() {
    let firstname = document.forms["register"]["firstname"].value;
    let lastname = document.forms["register"]["lastname"].value;
    let email = document.forms["register"]["email"].value;
    let username = document.forms["register"]["username"].value;
    let password = document.forms["register"]["password"].value;
    let repeatePassword = document.forms["register"]["repeatepassword"].value;
    if(email == "") {
        document.getElementById('form-email').classList.add('error');
        document.getElementById('form-email-label').innerHTML="E-mail is required";
        return false;
    }
    if(username == "") {
        document.getElementById('form-username').classList.add('error');
        document.getElementById('form-username-label').innerHTML="Username is required";
        return false;
    }
    if(password == "") {
        document.getElementById('form-password').classList.add('error');
        document.getElementById('form-password-label').innerHTML="Password is required";
        return false;
    }
    if(repeatePassword == "") {
        document.getElementById('form-repeate-password').classList.add('error');
        document.getElementById('form-repeate-password-label').innerHTML="Please repeat the password";
        return false;
    }
    if(password != repeatePassword) {
        document.getElementById('form-repeate-password').classList.add('error');
        document.getElementById('form-repeate-password-label').innerHTML="The passwords don't match";
        return false;
    }
    setUserInfo();
}

function validateLogin() {
    let username = document.forms["login"]["username"].value;
    let password = document.forms["login"]["password"].value;
    if(username == "") {
        document.getElementById('form-login-username').classList.add('error');
        document.getElementById('form-login-username-label').innerHTML="Username is required";
        return false;
    }
    if(password == "") {
        document.getElementById('form-login-password').classList.add('error');
        document.getElementById('form-login-password-label').innerHTML="Password is required";
        return false;
    }
    setUserLogin();

}

