

var connect = require('./Connection');




function AddUser(user,response) {
        connect.connection.beginTransaction(function () {
            const sql = `INSERT INTO users (login, password, email, name, phone, date, admin) VALUES ("${user.login}","${user.password}","${user.email}","${user.name}","${user.phone}","${user.date}","${0}")`;
            connect.connection.query(sql, function (err, result) {
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
    connect.connection.beginTransaction(function () {
        var sql = `SELECT * FROM users WHERE login = "${user.login}"`;
        connect.connection.query(sql, function (err, result) {
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


