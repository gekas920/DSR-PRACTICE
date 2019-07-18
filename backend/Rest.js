const service = require('./LoginService');
const equip = require('./EquipService');
const secured = require('./App');


secured.app.put('/',(req,res) => {
    const user = req.body;
    delete user.confirm;
    delete user.visibility;
    delete user.conf;
    user.admin = false;
    service.AddUser(user,res);
});



secured.app.get(secured.Api + '/equipment',(request,response)=>{
   equip.ShowEquip(request,response);
});

secured.app.get(secured.Api + '/equipmentPick',(request,response)=>{
   equip.ShowPicked(request,response,request.query.name);
});

secured.app.post('/login',(request,response)=>{
   service.LogUser(request.body,response);
});



