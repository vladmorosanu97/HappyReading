var mysql = require('mysql');
var Joi = require('joi');
var express = require('express');
var configDataBase = require('./settings.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var connection = configDataBase.create();

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
        
    var sql = "SELECT * from books";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        connection.end();
        res.json(result);
    });
   
});

module.exports = router;
