const service = require('./LoginService');
const secured = require('./App');
const change = require('./ChangeUserInfo');
const equip = require('./EquipService');






secured.app.post('/updateUserInfo',(request,response)=>{
    change.ChangeInfo(request.body);
});


  secured.app.put('/',(req,res) => {
      const user = req.body;
      user.admin = false;
      service.AddUser(user,res);
  });


secured.app.post('/login',(req,res)=>{
    service.LogUser(req.body,res);
});

secured.app.get(secured.Api+'/equipment',(request,response)=>{
    equip.ShowAllEquip(response);
});

secured.app.get(secured.Api + '/equipmentPick',(request,response)=>{
   //equip.ShowPicked(request,response,request.query.name);
});



