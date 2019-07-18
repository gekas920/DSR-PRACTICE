const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const service = require('./LoginService');
const db = require('./models');
const insert = require('./Insert/InsertInto');


const Api = '/api';



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(Api, function (req, res, next) {
    service.check(req.headers.authorization,res,next);
});



db.sequelize.sync().then(()=>{
    insert;
    app.listen(3000, function () {
        console.log('App listening on port 3000!');
    });
});

module.exports.app = app;
module.exports.Api = Api;