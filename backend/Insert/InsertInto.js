const secure = require('../config/bcrypt');
const models = require('../models');


const infoAdmin1 = {
    login:'admin',
    password:secure.crypt.hashSync('qwerty',secure.salt),
    email:'test@test',
    name:'Evgeny',
    phone:'88005553535',
    date:'1999-12-23',
    admin:true
};

const infoAdmin2= {
    login:'Superadmin',
    password:secure.crypt.hashSync('qwerty',secure.salt),
    email:'email@email',
    name:'Elisey',
    phone:'89204610789',
    date:'1993-10-13',
    admin:true
};

const infoAdmin3= {
    login:'Cooladmin',
    password:secure.crypt.hashSync('qwerty',secure.salt),
    email:'admin@email',
    name:'Akakiy',
    phone:'1485369',
    date:'1990-07-05',
    admin:true
};

const arrUsers = [infoAdmin1,infoAdmin2,infoAdmin3];
arrUsers.forEach(element=>{
    module.exports.insert = models.User.findOrCreate({   //Это ужасно
        where:{
            login:element.login
        },
        defaults:element
    })
});


const Equip1= {
  name:'Ball',
  availability:false,
  description:"Cool leather ball. It seems really old but kids love to kick the ball in the old ladies",
    UserId:1
};


const Equip2= {
    name:'JBL p.speaker',
    availability:true,
    description:"In some situation it's really necessary. You mustn't turn on it on the streets",
    UserId:2
};


const Equip3= {
    name:'Knife',
    availability:false,
    description:'Cold steel.It smells like fish',
    UserId:3
};

const Equip4= {
    name:'Phone',
    availability:true,
    description:'Xiaomi.Top!'
};

const Equip5= {
    name:'English vocabulary',
    availability:true,
    description:"It's useful book for translator"
};



const arrEquip = [Equip1,Equip2,Equip3,Equip4,Equip5];
arrEquip.forEach(element=>{
    module.exports.insert = models.Equipment.findOrCreate({
        where:{
            name:element.name
        },
        defaults:element
    })
});




