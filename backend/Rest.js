var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require("body-parser");
var service = require('./LoginService');
var equip = require('./EquipService');
var db = require('./models');
var insert = require('./Insert/InsertInto');
var insertEquip = require('./Insert/InsertInto');



const securedApi = '/api';
const authHeader = 'Authorization';


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.put('/',(req,res) => {
    const user = req.body;
    delete user.confirm;
    delete user.visibility;
    delete user.conf;
    user.admin = false;
    service.AddUser(user,res);
});


app.use(securedApi, function (req, res, next) {
    service.check(req.headers.authorization,res,next);
});

app.get(securedApi + '/equipment',(request,response)=>{
   equip.ShowEquip(request,response);
});

app.get(securedApi + '/equipmentPick',(request,response)=>{
   equip.ShowPicked(request,response,request.query.name);
});


app.post('/login',(request,response)=>{
   service.LogUser(request.body,response);
});



app.listen(3000, function () {
    db.sequelize.sync();
    insert;
    console.log('App listening on port 3000!');
});