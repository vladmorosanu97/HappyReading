//set local storage for username
function setUserInfo() {
    let username = document.getElementById('input_username').value;
    localStorage.setItem('username', username);
    localStorage.setItem('countBooks', 0);
}
function removeUserInfo() {
    localStorage.removeItem('username');
    window.location.replace('../index.html');
}
