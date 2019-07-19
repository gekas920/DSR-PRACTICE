const secure = require('./config/bcrypt');
const db = require('./models');
const jwt = require('jsonwebtoken');


const secret = 'VSU';



function getToken(id) {
    return jwt.sign({
        data: id
    }, secret, { expiresIn: '1h' });
}


function checkToken(token,response,next) {
    try {
        const json = jwt.verify(token, secret);
        db['User'].findByPk(json.data)
            .then(result=>{
                if(result.length === 0){
                    response.send(457).end();
                }
                next();
            })
            .catch(err=>{
                response.sendStatus(457).end();
            })
    }
    catch (e) {
        response.status(456).end();
    }
}


function AddUser(user,response){
    db['User'].findOrCreate({
        where:{
            login:user.login
        },
        defaults:{
            login:user.login,
            password:secure.crypt.hashSync(user.password,secure.salt),
            email:user.email,
            name:user.name,
            phone:user.phone,
            date:user.date,
            admin:false
        }
    }).then(([user, created]) =>{
        if(created){
            const token = getToken(user.id);
            response.send(token);
        }
        else {
            response.status(409).end();
        }
    });
}


function LogUser(user,response) {
    db['User'].findOne({where: {login: user.login}}).then(result => {
        if(!result){
            response.send('Incorrect login');
            return;
        }
        if (!CheckPass(user.password, result.dataValues.password)) {
            response.status(407);
            response.send('Incorrect Password');
            return;
        }
        const token = getToken(result.dataValues.id);
        response.send(token);
    })
        .catch(err => {
            console.log(err);
            response.status(500).end();
        })
}



/**
 * @return {boolean}
 */
function CheckPass(password,hash){
    return secure.crypt.compareSync(password,hash);
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





