# JavaScriptFullStack-Project

For the Front-End part, I used HTML5, CSS3, JavaScript and a little bit of Semantic UI framework. 

For the Back-End part, I used Express framework and JavaScript. 

For the database, I used MySQL which had a database stored online. 

Back-End shares data with Front-End through JSON. 

In order to be able to borrow books, you need to have an account. To register, you need to fill in your full name, email address and create
a username and a password, which you will be using when you want to log in. All of the fields are mandatory. You cannot access the online
library if you don't have an account already. 

If you will not provide a value for either of those fields, a message will show up on the screen, informing you the fields are mandatory. 

Book Depository delivers resources to its users until the funds aren't available anymore. This means that if you want to borrow a book
which isn't available at the moment, a message will let you know about this. 

You can only borrow up to 3 books at a time and up to 5 books in total. Once you select a book, you will see the number of your borrowed 
books at the top of the page, in your virtual cart. If, let's say, you changed your mind and you want a different book, but you already 
have 5 books in your cart, you can return one of those 5 books and choose a different one instead. 

Once you borrowed a book, you have a limited time span available for you to be able to read it (one minute, for a much simpler test). 

If the stopwatch has finished already, you won't be able to borrow any more books. If you want to reset the stopwatch, you must return any
book from you cart. 

In the "Your books" section, you can see more information regarding the book and the date that's due for the book to be returned. You can
also see your previous orders, down below. 

How to install:

1. Clone or download the project.
1. Install node.js from there: [Node Js](https://nodejs.org/en/).
2. Open your cmd and go in the project folder.
3. Type ``npm install``.
4. Go in app folder.
5. Type ``npm install``.
6. Type ``npm start``.
7. Now, go in browser at ``localhost:3000`` and enjoy! :D
