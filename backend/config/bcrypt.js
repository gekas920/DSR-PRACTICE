const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


console.log(salt);


module.exports.crypt = bcrypt;
module.exports.salt = salt;