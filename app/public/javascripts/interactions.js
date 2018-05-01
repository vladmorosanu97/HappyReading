

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
            books = data[0].books;

            localStorage.setItem('id', id);
            
            let userFullName = document.getElementById('user-name');
            userFullName.innerHTML = firstname.capitalize() + ' ' + lastname.capitalize();
            let userEmail = document.getElementById('user-email');
            userEmail.innerHTML = email;

            let userBooks = document.getElementById('user-books');
            userBooks.innerHTML = books;

            localStorage.setItem('countBooks',books);
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
                            article.setAttribute("data-tooltip","This book is unavailable!");
                            article.setAttribute("data-position","top center");
                            article.setAttribute("data-inverted","");
                    
                          
                        }
                        article.addEventListener('click', () => {
                        
                        if(data[index].copies != 0) {

                            if(!article.classList.contains('owned')) {


                                let value =  orders.toggleOrder(data[index].ID);
                                let countSelected = orders.getCount();
                                if(value >= 0) {
                                    article.classList.toggle('selectedOrder');
                                    document.getElementById('cart').innerHTML = `<i class="shop icon" ></i> Add to cart (${countSelected})`;
                                    document.getElementById('info-errors').innerHTML = '';
                                }
                                else {
                                    if(value == -1) {
                                        document.getElementById('info-errors').innerHTML = 'You can only add to your cart up to 3 books at once!';
                                    }
                                    else {
                                        if(value == -2) {
                                            document.getElementById('info-errors').innerHTML = 'You can only borrow up to 5 books!';
                                        }
                                    }
                                    
                                }
                            }
                            else {
                                document.getElementById('info-errors').innerHTML = 'You already have this book!';
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
    let iduser = localStorage.getItem('id');
    getJSON(`http://localhost:3000/api/books/${iduser}`,  function(err, data) {
    
        if (err != null) {
            console.error(err);
        } else {
            
            if (err != null) {
                console.error(err);
            } else {
                
                for(let index = 0; index<data.length; index++) { 
                    document.getElementById(`${data[index].ID}`).classList.add('owned');
                    document.getElementById(`${data[index].ID}`).setAttribute('data-tooltip', 'You already have this book!');
                    document.getElementById(`${data[index].ID}`).setAttribute('data-position', 'top center');
                }
            }
        }
    });

}
function createBooksOnPageWithDetails(url, idElement) {
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
                    // article.setAttribute('style','background-color: #FFFFFF; opacity: 1;');
                    article.setAttribute('class', 'book-article');
                    article.setAttribute('style','background-color: #ffffff; opacity: 1; cursor: default;');
                    article.classList.add('details');
                    article.classList.add('special-article');
                    article.setAttribute('id', `${data[index].ID}`);
                    
                    section.appendChild(article);

    
                    let img = document.createElement('img');
                    img.setAttribute('src', `../../${data[index].imageLink}`);
                    img.setAttribute('class', 'image-book');
    
                    let span = document.createElement('span');
                   
                    article.appendChild(img);
    
                    let container = document.createElement('div');
                    container.setAttribute('class', 'other-info');
                    container.classList.add('block');
    
                    article.appendChild(container);
    
                    let title = document.createElement('h1');
                    title.setAttribute('class', 'title-book');
                    title.innerHTML = `Title: ${data[index].title}`;
                    container.appendChild(title);

                    let author = document.createElement('h3');
                    author.setAttribute('class', 'info-book');
                    author.innerHTML = `Author: ${data[index].author}`;
                    container.appendChild(author);

                    let language = document.createElement('h3');
                    language.setAttribute('class', 'info-book');
                    language.innerHTML = `Language: ${data[index].language}`;
                    container.appendChild(language);

                    let country = document.createElement('h3');
                    country.setAttribute('class', 'info-book');
                    country.innerHTML = `Country: ${data[index].country}`;
                    container.appendChild(country);
    
                    let pages= document.createElement('h3');
                    pages.setAttribute('class', 'info-book');
                    pages.innerHTML = `Pages: ${data[index].pages}`;
                    container.appendChild(pages);

                    let year = document.createElement('h3');
                    year.setAttribute('class', 'info-book');
                    year.innerHTML = `Year: ${data[index].year}`;
                    container.appendChild(year);

                    let containerForButton = document.createElement('div');
                    containerForButton.setAttribute('class', 'left-page');

                    container.appendChild(containerForButton);

                    let button = document.createElement('button');
                    button.setAttribute('class', 'ui');
                    button.classList.add('large');
                    button.classList.add('button');

                    button.setAttribute('onclick', `returnBook(${data[index].ID});`);
                    button.innerHTML = "Return book";
                    containerForButton.appendChild(button);
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
    createBooksOnPageWithDetails(`http://localhost:3000/api/books/${iduser}`, "books-page");
    createBooksOnPage(`http://localhost:3000/api/books/history/${iduser}`, "books-history");
}

function returnBook(idBook) {
        let idUser = localStorage.getItem('id');

        let form = document.createElement('form');
        form.setAttribute('action', 'http://localhost:3000/api/books/return');
        form.setAttribute('method', 'post');

        let inputID = document.createElement('input');
        inputID.setAttribute('type', 'hidden');
        inputID.setAttribute('name', 'idBook');
        console.log(idBook);
        inputID.setAttribute('value', `${idBook}`);

        let inputUser = document.createElement('input');
        inputUser.setAttribute('type', 'hidden');
        inputUser.setAttribute('name', 'idUser');
        inputUser.setAttribute('value', `${idUser}`);

        form.appendChild(inputID);
        form.appendChild(inputUser);
        document.body.appendChild(form);
        form.submit();

        let books = localStorage.getItem('countBooks');
        books--;
        localStorage.setItem('countBooks', books);
}

