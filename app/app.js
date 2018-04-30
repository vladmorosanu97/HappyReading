var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var configDataBase = require('./routes/settings.js');
var getBooks = require('./routes/books');
var indexRouter = require('./routes/index');
var dataBase = require('./routes/dbs');
var verifInsert = require('./routes/register');
var login = require('./routes/login');
var bodyParser = require('body-parser');
var addBorrow = require('./routes/addBorrow');
var returnBook = require('./routes/returnBook');

var app = express();
let courses = [
    { id: 1, name: "Matematica"},
    { id: 2, name: "Baze de date"},
    { id: 3, name: "Retele" }
]
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.use('/api/insert', verifInsert);
app.use('/api/login', login);
app.use('/setup', dataBase);
app.use('/api/books', getBooks);
app.use('/api/books/insert', addBorrow);
app.use('/api/books/return', returnBook);
app.get('/api/books/:iduser', function(req, res) {
    var connection = configDataBase.create();

    connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
      
    var sql = "SELECT b.ID, b.author, b.country, b.imageLink, b.language, b.link, b.pages,  b.title, b.year, b.copies from books b, current_borrowing c where c.id_book = b.id  and c.id_user = " + mysql.escape(req.params.iduser);

    connection.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
    connection.end();
});

app.get('/api/books/history/:iduser', function(req, res) {
  var connection = configDataBase.create();

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
    
  var sql = "SELECT b.ID, b.author, b.country, b.imageLink, b.language, b.link, b.pages,  b.title, b.year, b.copies from books b, history_borrowed c where c.id_book = b.id  and c.id_user = " + mysql.escape(req.params.iduser);

  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
  connection.end();
});
app.get('/api/users/:username', (req, res) => {
  var connection = configDataBase.create();
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  var sql = "SELECT id, firstname, lastname, email, username from users where username = " + mysql.escape(req.params.username);
  connection.query(sql, function (err, result) {
  if (err) throw err;
  res.json(result);
  });
});

module.exports = app;
