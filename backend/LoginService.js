const connect = require('./Connection');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const salt = bcrypt.genSaltSync(10);


var secret = 'VSU';


function checkToken(token,response,next) {
    try {
        var json = jwt.decode(token, secret);
    }
    catch (e) {
        response.status(456).end();
        return;
    }
    var sql = `SELECT * FROM users WHERE id = ? `;
    connect.connection.query(sql, json.id, function (err, result) {
        if (err || result.length === 0) {
            response.status(457).end();
        }
        next();
    })

}


function AddUser(user,response){
    var hash = bcrypt.hashSync(user.password, salt);
        connect.connection.beginTransaction(function () {
            const sql = `INSERT INTO users (login, password, email, name, phone, date, admin) VALUES ("${user.login}","${hash}","${user.email}","${user.name}","${user.phone}","${user.date}","${0}")`;
            connect.connection.query(sql, function (err, result) {
            if (err)
            {
                response.status(409).end();
            }
            else {
                const token = jwt.encode({id:result.insertId}, secret);
                response.send(token);
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
                    console.log(result[0].password,user.password);
                    response.status(535).end();
                    return;
                }
                response.send('hin');
            }
        });

    })
}



/**
 * @return {boolean}
 */
function CheckPass(hash,password){
    return hash === bcrypt.hashSync(password, salt);
}


module.exports.LogUser = LogUser;
module.exports.AddUser = AddUser;
module.exports.check = checkToken;
















