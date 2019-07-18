
const models = require('../models');


const infoAdmin1 = {
    login:'loh',
    password:'12345',
    email:'test@test',
    name:'Evgeny',
    phone:'148888888',
    date:'1999-12-23',
    admin:true
};


module.exports.insert = models.User.findOrCreate({
    where:{
        login:infoAdmin1.login
    },
    defaults:infoAdmin1
}).then(result=>{
    if(result) {
        const equip1 = {
            name: 'ball',
            availability: false,
            description: '12312312321',
            UserId: result[0].dataValues.id
        };
        models.Equipment.create(equip1);
    }
});







