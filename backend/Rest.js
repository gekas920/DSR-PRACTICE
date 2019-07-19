const service = require('./LoginService');
const equip = require('./EquipService');
const secured = require('./App');
const passport = require('passport');
const db = require('./models');









  secured.app.put('/',(req,res) => {
      const user = req.body;
      user.admin = false;
      service.AddUser(user,res);
  });


secured.app.post('/login',(req,res)=>{
    service.LogUser(req.body,res);
});



secured.app.get(secured.Api + '/equipment',(request,response)=>{
    response.status(200).end();
   //equip.ShowEquip(request,response);
});

secured.app.get(secured.Api + '/equipmentPick',(request,response)=>{
   //equip.ShowPicked(request,response,request.query.name);
});

secured.app.post('/login',(request,response)=>{
   service.LogUser(request.body,response);
});



