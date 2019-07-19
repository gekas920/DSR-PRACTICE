const bcrypt = require('bcrypt');





module.exports.crypt = bcrypt;
module.exports.salt = bcrypt.genSaltSync(10);