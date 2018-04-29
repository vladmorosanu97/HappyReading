var mysql = require('mysql');
var express = require('express');
var configDataBase = require('./settings.js');
var router = express.Router();
var parsedJSON = require('../public/images/books.json');
//CREATE TABLE USERS
// CREATE TABLE `mydb`.`users` ( `ID` INT(50) NOT NULL AUTO_INCREMENT , `firstname` VARCHAR(100) NOT NULL , `lastname` VARCHAR(100) NOT NULL , `email` VARCHAR(50) NOT NULL , `username` VARCHAR(50) NOT NULL , `password` VARCHAR(50) NOT NULL , PRIMARY KEY (`ID`), UNIQUE (`email`), UNIQUE (`username`)) ENGINE = InnoDB;

//Insert into users
// INSERT INTO `users` (`ID`, `firstname`, `lastname`, `email`, `username`, `password`) VALUES ('1', 'admin', 'admin', 'admin@bookdeporitory.com', 'admin', 'admin')


//CREATE TABLE BOOKS
//CREATE TABLE `mydb`.`books` ( `ID` INT(50) NOT NULL AUTO_INCREMENT , `author` VARCHAR(100) NOT NULL , `country` VARCHAR(100) NOT NULL , `imageLink` VARCHAR(5000) NOT NULL , `language` VARCHAR(100) NOT NULL , `link` VARCHAR(5000) NOT NULL , `pages` INT(20) NOT NULL , `title` VARCHAR(100) NOT NULL , `year` INT(20), `copies` INT(20) NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;

/* GET users listing. */

router.get('/', function(req, res, next) {
  var connection = configDataBase.create();
      
      connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
      // var sql = "CREATE TABLE `mydb`.`books` ( `ID` INT(50) NOT NULL AUTO_INCREMENT , `author` VARCHAR(100) NOT NULL , `country` VARCHAR(100) NOT NULL , `imageLink` VARCHAR(5000) NOT NULL , `language` VARCHAR(100) NOT NULL , `link` VARCHAR(5000) NOT NULL , `pages` INT(20) NOT NULL , `title` VARCHAR(100) NOT NULL , `year` INT(20) NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;";
      // connection.query(sql, function (err, result) {
      //   if (err) 
      //     throw err;
      //   console.log("Table created with succes");
      // });

      

      // for(let index = 0; index < parsedJSON.length; index++) {
      //   var sql = "INSERT INTO mydb.books (author, country, imageLink, language, link, pages, title, year, copies) VALUES ?";
      //   let copies = Math.floor((Math.random() * 10) + 1);
      //   var values = [
      //       [parsedJSON[index].author, parsedJSON[index].country, parsedJSON[index].imageLink, parsedJSON[index].language, parsedJSON[index].link, parsedJSON[index].pages, parsedJSON[index].title, parsedJSON[index].year, copies],
      //   ];
  
      //   connection.query(sql,[values], function (err, result) {
      //     if (err) throw err;
          
      //   });
      // }
      
      res.send("Succes");

      connection.end();
    //   res.json(blocks);
   
});

module.exports = router;