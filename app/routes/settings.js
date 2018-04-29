var mysql = require('mysql');

let configDataBase = { };
configDataBase.create = () => {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
      });
    return connection;
};

module.exports = configDataBase;