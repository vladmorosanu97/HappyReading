String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var getJSON = function(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
    
        var status = xhr.status;
        
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    
    xhr.send();
};
function isLoged() {
    let username = localStorage.getItem('username');
    if(!username) {
        window.location.replace('../index.html');
    }
    else
        onloadUserInfo();
}
function onloadUserInfo() {
    let firstname, lastname, email;
    let username = localStorage.getItem('username');
    getJSON(`http://localhost:3000/api/users/${username}`,  function(err, data) {
    
        if (err != null) {
            console.error(err);
        } else {
            
            firstname = data[0].firstname;
            lastname = data[0].lastname;
            email = data[0].email;
            
            let userFullName = document.getElementById('user-name');
            userFullName.innerHTML = firstname.capitalize() + ' ' + lastname.capitalize();
            let userEmail = document.getElementById('user-email');
            userEmail.innerHTML = email;
        }
    });
}
