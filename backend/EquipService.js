var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "users"
});

con.connect(function (err) {
    if (err)
        console.log(err);
});


function ShowEquip(request, response) {
    con.beginTransaction(function () {
        con.query("SELECT id,name,availability,owner FROM equipment", function (err, result) {
            if (err)
                throw err;
            response.send(result);
        });
    });
    return request;
}

module.exports.ShowEquip = ShowEquip;