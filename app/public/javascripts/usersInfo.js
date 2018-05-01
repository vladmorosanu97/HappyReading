//set local storage for username
function removeUserInfo() {
    localStorage.removeItem('username');
    window.location.replace('../index.html');
}
