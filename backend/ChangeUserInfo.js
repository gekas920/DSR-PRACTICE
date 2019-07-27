const db = require('./models');







function ChangeInfo(user,res) {
    db['User'].findByPk(user.id)
        .then(result=>{
            result.update({
                email:user.email,
                phone:user.phone,
                name:user.name,
                date:user.date
            }).then(result=>{
                const info = {
                    email: result.dataValues.email,
                    name: result.dataValues.name,
                    phone: result.dataValues.phone,
                    date: result.dataValues.date
                };
                res.send(info);
            })
        });
}


module.exports.ChangeInfo = ChangeInfo;