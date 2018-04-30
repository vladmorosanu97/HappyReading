

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
    let firstname, lastname, email, id;
    let username = localStorage.getItem('username');
    getJSON(`http://localhost:3000/api/users/${username}`,  function(err, data) {
    
        if (err != null) {
            console.error(err);
        } else {
            
            firstname = data[0].firstname;
            lastname = data[0].lastname;
            email = data[0].email;
            id = data[0].id;
            localStorage.setItem('id', id);
            
            let userFullName = document.getElementById('user-name');
            userFullName.innerHTML = firstname.capitalize() + ' ' + lastname.capitalize();
            let userEmail = document.getElementById('user-email');
            userEmail.innerHTML = email;
        }
    });
}
function createBooksOnPage(url, idElement, addEvent) {
    getJSON(url,  function(err, data) {
    
        if (err != null) {
            console.error(err);
        } else {
            
            if (err != null) {
                console.error(err);
            } else {
                
                for(let index = 0; index<data.length; index++) {
                    let section = document.getElementById(idElement);
    
                    let article = document.createElement('article');
                    article.setAttribute('class', 'book-article');
                    article.setAttribute('id', `${data[index].ID}`);
    
                    if(addEvent == true) {
                        if(data[index].copies <= 0) {
                            article.classList.add('sold');
                        }
                        article.addEventListener('click', () => {
                        
                        if(data[index].copies != 0) {
                            let value =  orders.toggleOrder(data[index].ID);
                            if(value >= 0) {
                                article.classList.toggle('selectedOrder');
                                document.getElementById('cart').innerHTML = `<i class="shop icon" ></i> Add to cart (${value})`;
                                document.getElementById('info-errors').innerHTML = '';
                            }
                            else {
                                if(value == -1) {
                                    document.getElementById('info-errors').innerHTML = 'Poti adauga maximum 3 carti in cos!';
                                }
                                else {
                                    if(value == -2) {
                                        document.getElementById('info-errors').innerHTML = 'Puteti imprumuta maximum 5 carti!';
                                    }
                                }
                                
                            }
                        }
                        });
                        
                    }
                    
                    section.appendChild(article);
    
                    let img = document.createElement('img');
                    img.setAttribute('src', `../../${data[index].imageLink}`);
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
        }
    });
}
function borrowBooks() {
    let orderList = orders.getOrderList();
    if(orderList.length > 0) {

        let form = document.createElement('form');
        form.setAttribute('action', 'http://localhost:3000/api/books/insert');
        form.setAttribute('method', 'post');

        let inputID = document.createElement('input');
        inputID.setAttribute('type', 'hidden');
        inputID.setAttribute('name', 'id');
        inputID.setAttribute('value',localStorage.getItem('id'));

        form.appendChild(inputID);

        for (index in orderList) {
            let input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', index);
            input.setAttribute('value',orderList[index]);
            orders.addBorrowBook(orderList[index]);
            form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
    }
    
}


function parseBooks() {
    createBooksOnPage("http://localhost:3000/api/books", "books-page", true);
}

function getBorrowBooks() {
    let iduser = localStorage.getItem('id');
    createBooksOnPage(`http://localhost:3000/api/books/${iduser}`, "books-page");
    createBooksOnPage(`http://localhost:3000/api/books/history/${iduser}`, "books-history");
}