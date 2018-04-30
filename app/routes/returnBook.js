var mysql = require('mysql');
var express = require('express');
var configDataBase = require('./settings.js');
var router = express.Router();


/* GET users listing. */
router.post('/', function(req, res, next) {
    var connection = configDataBase.create();
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    

    var sql = "DELETE FROM `current_borrowing` WHERE `id_book` = " + req.param('idBook');
    connection.query(sql, function (err, result) {
        if (err) throw err;
    });

    sql = "SELECT copies from books where ID = " + req.param('idBook');
    connection.query(sql, function (err, result) {
        if (err) throw err;
        let newCopies = result[0].copies;
        newCopies++;

        sql = `UPDATE books SET copies = ${newCopies} WHERE books.ID = ` +  req.param('idBook');

        connection.query(sql, function (err, result) {
            if (err) throw err;
        });
    });

    // connection.end();
    res.redirect('../../books/borrowed/index.html');
});

module.exports = router;