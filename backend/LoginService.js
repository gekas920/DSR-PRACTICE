const secure = require('./config/bcrypt');
const jwt = require('jwt-simple');
const db = require('./models');


var secret = 'VSU';


function checkToken(token,response,next) {
    try {
        var json = jwt.decode(token, secret);
    }
    catch (e) {
        response.status(456).end();
        return;
    }
    db['User'].findByPk(json.id)
        .then(result=>{
            console.log(result);
            if(result.length === 0){
                response.send(457).end();
            }
            next();
        })
        .catch(err=>{
            response.send(457).end();
        })
}


function AddUser(user,response){
    var hash = secure.crypt.hashSync(user.password, secure.salt);


}


function LogUser(user,response) {
    console.log(user.password);
    db['User'].findOne({where: {login: user.login}}).then(result => {
        if(!result){
            response.status(524).end();
            return;
        }
        if (!CheckPass(result.dataValues.password, user.password)) {
            response.status(535).end();
            return;
        }
        response.send('ZAEBIS!');
    })
        .catch(err => {
            console.log(err);
            response.status(500).end();
        })
}



/**
 * @return {boolean}
 */
function CheckPass(hash,password){
    console.log(password);
    console.log(secure.crypt.hashSync(password,secure.salt));
    console.log(hash);
    return hash === secure.crypt.hashSync(password,secure.salt);
}


module.exports.LogUser = LogUser;
module.exports.AddUser = AddUser;
module.exports.check = checkToken;










// connect.connection.query(sql, function (err, result) {
//     if (err)
//     {
//         response.status(409).end();
//     }
//     else {
//         const token = jwt.encode({id:result.insertId}, secret);
//         response.send(token);
//     }});





