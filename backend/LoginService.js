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
        response.sendStatus(457).end();
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
            admin:false,
            photo:user.photo
        }
    }).then(([user, created]) =>{
        if(created){
            const token = getToken(user.dataValues.id);
            const userInfo = {
                id:user.dataValues.id,
                email:user.dataValues.email,
                name:user.dataValues.name,
                phone:user.dataValues.phone,
                date:user.dataValues.date,
                admin:user.dataValues.admin,
            };
            response.send({
                token:token,
                info:userInfo
            });
        }
        else {
            response.send('Already exist');
        }
    })
        .catch(err=>{
            response.send('Incorrect data');
        })
}


function LogUser(user,response) {
    db['User'].findOne({where: {login: user.login}}).then(result => {
        if(!result){
            response.send('Incorrect login');
            return;
        }
        if (!CheckPass(user.password, result.dataValues.password)) {
            response.send('Incorrect password');
            return;
        }
        const userInfo = {
            id:result.dataValues.id,
            email:result.dataValues.email,
            name:result.dataValues.name,
            phone:result.dataValues.phone,
            date:result.dataValues.date,
            admin:result.dataValues.admin,
        };

        const token = getToken(result.dataValues.id);
        response.send({
            token:token,
            info:userInfo
        });
    })
        .catch(err => {
            console.log(err);
            response.status(500).end();
        })
}

function ShowAllUsers(response) {
    db['User'].findAll().then(result=>{
        response.send(result);
    })
}


function deleteUser(body,res) {
    db['Equipment'].findAll({
        where:{
            UserId:body.id
        }
    })
        .then(result=>{
            result.forEach(element=>{
                let lastOwner = element.dataValues.owner;
                element.update({
                    UserId:null,
                    availability:true,
                    owner:'-----',
                    lastOwner:lastOwner
                });
            })
        });
    db['User'].destroy({
        where:{
            id:body.id
        }
    })
        .then(result=>{
            res.sendStatus(200);
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
module.exports.showAllUsers = ShowAllUsers;
module.exports.deleteUser = deleteUser;
module.exports.loadPhoto = loadPhoto;





