const db = require('./models');


function ShowAllEquip(response) {
    db['Equipment'].findAll().then(result=>{
        response.send(result);
    })

}

function CreateEquip(body,response){
    db['Equipment'].findOrCreate({
        where:{
            name:body.name
        },
        defaults:{
            name:body.name,
            owner:'-----',
            lastOwner:'-----',
            availability:true,
            description:body.description
        }
    }).then(([body,created])=>{
        if(!created){
            response.send('Already Exist');
        }
        else {
            response.send('OK');
        }
    });
}

function findEquip(body,response){
    db['Equipment'].findOne({
        where:{
            name:body.name
        }
    })
        .then(result=>{
            if(result){
                response.send(result)
            }
            else {
                response.send('Not found');
            }
        })
}

function updateEquip(body,response){
    db['Equipment'].findOne({
        where:{
            name:body.value
        }
    })
        .then(result=>{
            result.update({
                name:body.updateName,
                description:body.updateDescription
            });
            response.send('OK');
        })
}

function deleteEquip(body,response){
    db['Equipment'].destroy({
        where:{
            name:body.name
        }
    }).then(result=>{
        response.send('OK');
    })
}

async function pickUpEquip(body, response) {
    const user = await db['User'].findOne({
        where: {
            id: body.id
        }
    }).then(result => {
         return result.dataValues;
    });
    db['Equipment'].findOne({
        where: {
            name: body.name
        }
    }).then(result => {
        const lastOwner = result.dataValues.owner;
        result.update({
            owner: user.name,
            lastOwner:lastOwner,
            UserId:user.id,
            availability:false
        });
    });
}

function showUserEquip(body,response){
    db['Equipment'].findAll({
        where:{
            UserId:body.UserId
        }
    })
        .then(result=>{
            if(result.length){
                if(result.length <= 1){
                    response.send(result[0].dataValues)
                }
                else {
                    let infoArr = result.map(elem=>{
                        return elem.dataValues
                    });
                    response.send(infoArr);
                }
            }
            else {
                response.send([]);
            }
        })
}

function giveBackEquip(body,response){
    let lastOwnerValue = '';
    db['User'].findByPk(body.UserId)
        .then(result=>{
            lastOwnerValue = result.dataValues.name;
        });
    db['Equipment'].findOne({
        where:{
            name:body.name
        }
    })
        .then(result=>{
            result.update({
                owner:'-----',
                lastOwner:lastOwnerValue,
                availability: true,
                UserId:null
            })
        })
}

module.exports.ShowAllEquip = ShowAllEquip;
module.exports.CreateEquip = CreateEquip;
module.exports.findEquip = findEquip;
module.exports.updateEquip = updateEquip;
module.exports.deleteEquip = deleteEquip;
module.exports.pickUpEquip = pickUpEquip;
module.exports.showUserEquip = showUserEquip;
module.exports.giveBackEquip = giveBackEquip;