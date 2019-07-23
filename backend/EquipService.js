const db = require('./models');





function ShowAllEquip(response) {
    db['Equipment'].findAll().then(result=>{
        response.send(result);
    })

}




module.exports.ShowAllEquip = ShowAllEquip;