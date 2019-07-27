const service = require('./LoginService');
const secured = require('./App');
const change = require('./ChangeUserInfo');
const equip = require('./EquipService');






secured.app.post(secured.Api+'/updateUserInfo',(req,res)=>{
    change.ChangeInfo(req.body,res);
});


  secured.app.post('/',(req,res) => {
      const user = req.body;
      user.admin = false;
      service.AddUser(user,res);
  });


secured.app.post('/login',(req,res)=>{
    service.LogUser(req.body,res);
});

secured.app.get(secured.Api+'/equipment',(req,res)=>{
    equip.ShowAllEquip(res);
});

secured.app.post(secured.Api+'/findEquip',(req,res)=>{
   equip.findEquip(req.body,res);
});

secured.app.put(secured.Api+'/createEquip',(req,res)=>{
    equip.CreateEquip(req.body,res);
});

secured.app.post(secured.Api+'/updateEquip',(req,res)=>{
    equip.updateEquip(req.body,res);
});

secured.app.post(secured.Api+'/removeEquip',(req,res)=>{
    equip.deleteEquip(req.body,res);
});

secured.app.get(secured.Api+'/showAllUsers',(req,res)=>{
   service.showAllUsers(res);
});

secured.app.post(secured.Api+'/updateInfoByAdmin',(req,res)=>{
   change.ChangeInfo(req.body,res);
});

secured.app.post(secured.Api+'/deleteUser',(req,res)=>{
   service.deleteUser(req.body,res);
});

secured.app.post(secured.Api+'/pickUpEquip',(req,res)=>{
   equip.pickUpEquip(req.body, res);
});

secured.app.post(secured.Api+'/showUserEquip',(req,res)=>{
   equip.showUserEquip(req.body,res)
});

secured.app.post(secured.Api+'/giveBackEquip',(req,res)=>{
   equip.giveBackEquip(req.body,res);
});

secured.app.post(secured.Api+'/getPhoto',(req,res)=>{
    service.loadPhoto(req.body,res);
});

