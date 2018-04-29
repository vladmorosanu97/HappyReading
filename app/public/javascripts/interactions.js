

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
function parseBooks() {
    getJSON('http://localhost:3000/api/books',  function(err, data) {
    
        if (err != null) {
            console.error(err);
        } else {
            
            for(let index = 0; index<data.length; index++) {
                let section = document.getElementById('books-page');

                let article = document.createElement('article');
                article.setAttribute('class', 'book-article');
                article.setAttribute('id', `${data[index].ID}`);
                article.addEventListener('click', () => {
                    
                    let value =  orders.toggleOrder(data[index].ID);
                    if(value != -1) {
                        article.classList.toggle('selectedOrder');
                        document.getElementById('cart').innerHTML = `<i class="shop icon" ></i> Add to cart (${value})`;
                        document.getElementById('info-errors').innerHTML = '';
                    }
                    else {
                        document.getElementById('info-errors').innerHTML = 'Poti adauga maximum 3 carti in cos!';
                    }
                    
                });
                
                section.appendChild(article);

                let img = document.createElement('img');
                img.setAttribute('src', `../${data[index].imageLink}`);
                img.setAttribute('class', 'image-book');

                article.appendChild(img);

                let title = document.createElement('h1');
                title.setAttribute('class', 'title-book');
                title.innerHTML = data[index].title;
                article.appendChild(title);

                let container = document.createElement('div');
                container.setAttribute('class', 'other-info');

                article.appendChild(container);

                let author = document.createElement('h3');
                author.setAttribute('class', 'author-book');
                author.innerHTML = data[index].author;

                container.appendChild(author);

                let copies = document.createElement('h3');
                copies.setAttribute('class', 'available-books');

                copies.innerHTML = data[index].copies;

                container.appendChild(copies);

            }
        }
    });
}


