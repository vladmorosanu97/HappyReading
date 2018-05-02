var mysql = require('mysql');
var Joi = require('joi');
var express = require('express');
var configDataBase = require('./settings.js');
var router = express.Router();
//CREATE TABLE USERS
// CREATE TABLE `mydb`.`users` ( `ID` INT(50) NOT NULL AUTO_INCREMENT , `firstname` VARCHAR(100) NOT NULL , `lastname` VARCHAR(100) NOT NULL , `email` VARCHAR(50) NOT NULL , `username` VARCHAR(50) NOT NULL , `password` VARCHAR(50) NOT NULL , PRIMARY KEY (`ID`), UNIQUE (`email`), UNIQUE (`username`)) ENGINE = InnoDB;

//Insert into users
// INSERT INTO `users` (`ID`, `firstname`, `lastname`, `email`, `username`, `password`) VALUES ('1', 'admin', 'admin', 'admin@bookdeporitory.com', 'admin', 'admin')



/* GET users listing. */
router.post('/', function(req, res, next) {
    var connection = configDataBase.create();
    
      const schema = {
          firstname: Joi.string().min(3).required(),
          lastname: Joi.string().min(3).required(),
          email: Joi.string().min(3).required(),
          username: Joi.string().min(3).required(),
          password: Joi.string().min(8).required(),
          repeatepassword: Joi.string().min(8).required().equal(req.body.password)
      }
     const result = Joi.validate(req.body, schema);

     if(result.error) {
        //400 Bad request
        res.status(400).send(result.error.details[0].message);
     }
     else
     {
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });
    
        var user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            repeatePassword: req.body.repeatepassword
        }

        var sql = "INSERT INTO users (firstname, lastname, email, username, password) VALUES ?";
        
        var values = [
            [user.firstname, user.lastname, user.email, user.username, user.password],
        ];

        connection.query(sql,[values], function (err, result) {
          if (err) throw err;
          connection.end();
        });
        res.redirect('../registered/');
     }
});

module.exports = router;