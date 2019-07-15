

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


function AddUser(user,response) {
        con.beginTransaction(function () {
            const sql = `INSERT INTO users (login, password, email, name, phone, date, admin) VALUES ("${user.login}","${user.password}","${user.email}","${user.name}","${user.phone}","${user.date}","${0}")`;
            con.query(sql, function (err, result) {
            if (err)
            {
                response.status(409).end();
            }
            else {
                response.send({id:result.insertId});
            }});
    });
}


function LogUser(user,response){
    con.beginTransaction(function () {
        var sql = `SELECT * FROM users WHERE login = "${user.login}"`;
        con.query(sql, function (err, result) {
            if (err){
                response.status(500).end();
                return;
            }
            if(result.length === 0){
                response.status(204).end();
            }
            else {
                if(!CheckPass(result[0].password,user.password)) {
                    response.status(535).end();
                    return;
                }
                response.send({id: result[0].id, password: result[0].password});
                }
        });

    })
}


/**
 * @return {boolean}
 */
function CheckPass(hash,password){
    return hash === password;
}


module.exports.LogUser = LogUser;
module.exports.AddUser = AddUser;


