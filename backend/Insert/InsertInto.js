const secure = require('../config/bcrypt');
const models = require('../models');


const infoAdmin1 = {
    login:'admin',
    password:secure.crypt.hashSync('12345',secure.salt),
    email:'test@test',
    name:'Evgeny',
    phone:'88005553535',
    date:'1999-12-23',
    admin:true
};


module.exports.insert = models.User.findOrCreate({
    where:{
        login:infoAdmin1.login
    },
    defaults:infoAdmin1
});







