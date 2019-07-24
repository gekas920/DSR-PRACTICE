const service = require('./LoginService');
const secured = require('./App');
const change = require('./ChangeUserInfo');
const equip = require('./EquipService');






secured.app.post('/updateUserInfo',(req,res)=>{
    change.ChangeInfo(req.body);
});


  secured.app.put('/',(req,res) => {
      const user = req.body;
      user.admin = false;
      service.AddUser(user,res);
  });


secured.app.post('/login',(req,res)=>{
    service.LogUser(req.body,res);
});

secured.app.get('/equipment',(req,res)=>{
    equip.ShowAllEquip(res);
});

secured.app.post('/findEquip',(req,res)=>{
   equip.findEquip(req.body,res);
});

secured.app.put('/createEquip',(req,res)=>{
    equip.CreateEquip(req.body,res);
});

secured.app.post('/updateEquip',(req,res)=>{
    equip.updateEquip(req.body,res);
});

secured.app.post('/removeEquip',(req,res)=>{
    equip.deleteEquip(req.body,res);
});



