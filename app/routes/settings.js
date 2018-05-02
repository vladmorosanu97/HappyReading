var mysql = require('mysql');

let configDataBase = { };
configDataBase.create = () => {
    var connection = mysql.createConnection({
        host: "sql7.freemysqlhosting.net",
        user: "sql7235921",
        password: "BFIVD8QRmk",
        database: "sql7235921"
      });
    return connection;
};

module.exports = configDataBase;