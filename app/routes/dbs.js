var mysql = require('mysql');
var express = require('express');
var router = express.Router();
//CREATE TABLE USERS
// CREATE TABLE `mydb`.`users` ( `ID` INT(50) NOT NULL AUTO_INCREMENT , `firstname` VARCHAR(100) NOT NULL , `lastname` VARCHAR(100) NOT NULL , `email` VARCHAR(50) NOT NULL , `username` VARCHAR(50) NOT NULL , `password` VARCHAR(50) NOT NULL , PRIMARY KEY (`ID`), UNIQUE (`email`), UNIQUE (`username`)) ENGINE = InnoDB;

//Insert into users
// INSERT INTO `users` (`ID`, `firstname`, `lastname`, `email`, `username`, `password`) VALUES ('1', 'admin', 'admin', 'admin@bookdeporitory.com', 'admin', 'admin')



/* GET users listing. */
router.get('/', function(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
      });
      
      connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
      var sql = "CREATE TABLE `mydb`.`users` ( `ID` INT(50) NOT NULL AUTO_INCREMENT , `firstname` VARCHAR(100) NOT NULL , `lastname` VARCHAR(100) NOT NULL , `email` VARCHAR(50) NOT NULL , `username` VARCHAR(50) NOT NULL , `password` VARCHAR(50) NOT NULL , PRIMARY KEY (`ID`), UNIQUE (`email`), UNIQUE (`username`)) ENGINE = InnoDB;";
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created with succes");
      });
      connection.end();
    //   res.json(blocks);
    res.send("Table created with succes");
});

module.exports = router;