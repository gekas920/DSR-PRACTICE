const multer = require('multer');
const path = require('path');



const pathPic = path.join(__dirname, '/equipPictures');
const storagePic = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,pathPic);
    },
    filename: function (req, file, cb) {
        const form = file.mimetype.split('/')[1];
        cb(null, file.originalname + '.' + form);
    }
});
const uploadPic = multer({storage: storagePic});

module.exports.uploadPic = uploadPic;