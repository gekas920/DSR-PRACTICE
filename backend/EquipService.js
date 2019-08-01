const db = require('./models');


function ShowAllEquip(response) {
    db['Equipment'].findAll(
        {
            include:[{
                model:db.User
            }]
        }
    ).then(result=>{
        const arr = result.map(elem=>{
            const hasOwner = !!elem.dataValues.User;
            const avail = elem.dataValues.availability;
            const ownerName = hasOwner ? elem.dataValues.User.dataValues.name : null;
            return {
                name:elem.dataValues.name,
                availability: elem.dataValues.availability,
                owner: avail ? null : ownerName,
                lastOwner:avail ? ownerName : null,
                description: elem.dataValues.description
            }
        });
        response.send(arr);
    })

}

function CreateEquip(body,response){
    db['Equipment'].findOrCreate({
        where:{
            name:body.name
        },
        defaults:{
            name:body.name,
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
            name:body
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
        result.update({
            UserId:user.id,
            availability:false
        });
    });
}

function showUserEquip(body,response){
    db['Equipment'].findAll({
        where:{
            UserId:body,
            availability:false
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
    db['Equipment'].findOne({
        where:{
            name:body.name
        }
    })
        .then(result=>{
            result.update({
                availability: true,
                UserId:body.UserId
            })
        })
}

module.exports.ShowAllEquip = ShowAllEquip;
module.exports.CreateEquip = CreateEquip;
module.exports.updateEquip = updateEquip;
module.exports.deleteEquip = deleteEquip;
module.exports.pickUpEquip = pickUpEquip;
module.exports.showUserEquip = showUserEquip;
module.exports.giveBackEquip = giveBackEquip;