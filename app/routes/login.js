var mysql = require('mysql');
var Joi = require('joi');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
      });
    
      const schema = {
          username: Joi.string().min(3).required(),
          password: Joi.string().min(8).required(),
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
            username: req.body.username,
            password: req.body.password,
        }
        
        var sql = "SELECT password from users where username = " + mysql.escape(user.username);

        connection.query(sql, function (err, result) {
            if (err) throw err;

            if(result[0].password == user.password)
            {
                res.redirect('../registered/');
            }
            else
                res.status(400).send("Wrong username or password");
            connection.end();
        });
       
     }

      

   
   
});

module.exports = router;