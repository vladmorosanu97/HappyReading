var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataBase = require('./routes/dbs');
var verifInsert = require('./routes/verifi');
var login = require('./routes/login');
var bodyParser = require('body-parser')

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
app.use('/users', usersRouter);
app.use('/api/insert', verifInsert);
app.use('/api/login', login);

module.exports = app;
