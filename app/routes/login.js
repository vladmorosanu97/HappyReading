var mysql = require('mysql');
var Joi = require('joi');
var express = require('express');
var configDataBase = require('./settings.js');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    var connection = configDataBase.create();
    
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
                res.status(400).send(`<!DOCTYPE html>
                <html>
                
                <head>
                    <title>Express</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css" />
                    <link rel="stylesheet" href="../stylesheets/style.css">
                    <script
                    src="https://code.jquery.com/jquery-3.3.1.js"
                    integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
                    crossorigin="anonymous"></script>
                
                    <script src="../javascripts/usersInfo.js"></script>
                    <script src="../javascripts/validateForm.js"></script>
                </head>
                
                <body>
                    <header class="header">
                        <div class="info-page">
                            <img src="../images/book.png" class="logo-page">
                            <h3 class="title">Book Depository</h3>
                        </div>
                
                        <nav class="navigation-bar">
                            <ul class="list-buttons">
                                <li class="ui large button active">Login</li>
                                <li class="ui large button"  onclick="location.href='../index.html'">Register</li>
                            </ul>
                        </nav>
                    </header>
                    <main class="main">
                        <section class="information-page">
                            <h1 class="main-title">So many books, so little time!</h1>
                            <p class="description">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a 
                                complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, 
                                dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure
                                 rationally encounter consequences that are extremely painful</p>
                        </section>
                        <section class="register-page">
                            <p class="description">Username or password are incorrect!</p>
                            <button class="ui button" onclick="location.href='../login/index.html'"> Go back </button>
                        </section>
                
                    </main>
                </body>
                
                </html>`);
            connection.end();
        });
       
     }
   
});

module.exports = router;
