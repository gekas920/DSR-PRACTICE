var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database:"users"
});

con.connect(function(err) {
    if (err)
        console.log();
});



function ShowEquip(request,response) {
    con.beginTransaction(function () {
        con.query("SELECT * FROM equipment", function (err, result) {
            if (err) throw err;
            response.send(result[0]);
        });
    })
    return request;
}

module.exports.ShowEquip = ShowEquip;