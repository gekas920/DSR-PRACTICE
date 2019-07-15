var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database:"ponomarev"
});

connection.connect(function(err) {
    if (err)
        console.log();
});


module.exports.connection = connection;