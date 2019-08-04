const multer = require('multer');
const path = require('path');


const dirPath = path.join(__dirname, '/Pictures');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,dirPath);
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        cb(null, file.originalname + '.' + ext);
    }
});
const upload = multer({storage: storage});


module.exports.uploadAvatar = upload;
