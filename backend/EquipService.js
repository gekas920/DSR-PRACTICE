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

module.exports.ShowAllEquip = ShowAllEquip;
module.exports.CreateEquip = CreateEquip;
module.exports.findEquip = findEquip;
module.exports.updateEquip = updateEquip;
module.exports.deleteEquip = deleteEquip;