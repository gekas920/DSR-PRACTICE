var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require("body-parser");
var service = require('./LoginService');
var equip = require('./EquipService');




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

app.get('/equipment',(request,response)=>{
   equip.ShowEquip(request,response);
});

app.post('/login',(request,response)=>{
   service.LogUser(request.body,response);
});


app.listen(3000, function () {
    console.log('App listening on port 3000!');
});