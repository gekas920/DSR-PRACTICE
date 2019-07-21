const db = require('./models');







function ChangeInfo(user) {
    db['User'].findByPk(user.id)
        .then(result=>{
            result.update({
                email:user.email,
                phone:user.phone,
                name:user.name,
                date:user.date
            })
        })
}


module.exports.ChangeInfo = ChangeInfo;