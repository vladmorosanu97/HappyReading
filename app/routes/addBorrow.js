var mysql = require('mysql');
var express = require('express');
var configDataBase = require('./settings.js');
var router = express.Router();



router.post('/', function(req, res, next) {
    var connection = configDataBase.create();

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    let userId = Number(req.body.id);
    let books = [];

    for(let index in req.body) {
       books[index] = Number(req.body[index]);
    }

    for(let index = 0; index< books.length; index++) {
        var sql = "INSERT INTO `current_borrowing` (`id_user`, `id_book`) VALUES ?";
        var values = [
            [userId, books[index]],
        ];
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
        });

        var sql = "INSERT INTO `history_borrowed` (`id_user`, `id_book`) VALUES ?";
        var values = [
            [userId, books[index]],
        ];
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
        });


        sql = `SELECT copies from books where ID = ${books[index]}`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            let newCopies = result[0].copies;
            newCopies--;

            sql = `UPDATE books SET copies = ${newCopies} WHERE books.ID = ${books[index]}`;

            connection.query(sql, function (err, result) {
                if (err) throw err;
            });
        });
    }

    // connection.end();
    res.redirect('../../books/index.html');
});

module.exports = router;