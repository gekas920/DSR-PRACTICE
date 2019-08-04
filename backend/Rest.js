const service = require('./LoginService');
const secured = require('./App');
const change = require('./ChangeUserInfo');
const equip = require('./EquipService');
const multer = require('./multerPicture');
const multerPic = require('./equipPicture');
const fs = require('fs');





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

secured.app.put(secured.Api+'/createEquip',(req,res)=>{
    equip.CreateEquip(req.body,res);
});

secured.app.post(secured.Api+'/updateEquip',(req,res)=>{
    equip.updateEquip(req.body,res);
});

secured.app.delete(secured.Api+'/removeEquip/:name',(req,res)=>{
    const Folder = './equipPictures/';
    const arr = fs.readdirSync(Folder);
    arr.forEach(element=>{
        const str = element.split('.');
        if(str[0] === req.params.name){
            fs.unlink(__dirname+'/equipPictures'+`/${element}`,(err => {
                console.log(err);
            }));
        }
    });
    equip.deleteEquip(req.params.name,res);
});

secured.app.get(secured.Api+'/showAllUsers',(req,res)=>{
   service.showAllUsers(res);
});

secured.app.post(secured.Api+'/updateInfoByAdmin',(req,res)=>{
   change.ChangeInfo(req.body,res);
});


secured.app.delete(secured.Api+'/deleteUser/:id',(req,res)=>{
    const Folder = './Pictures/';
    const arr = fs.readdirSync(Folder);
    arr.forEach(element=>{
        const str = element.split('.');
        if(str[0] === req.params.id){
            fs.unlink(__dirname+'/Pictures'+`/${element}`,(err => {
                console.log(err);
            }));
        }
    });
   service.deleteUser(req.params.id,res);
});

secured.app.post(secured.Api+'/pickUpEquip',(req,res)=>{
   equip.pickUpEquip(req.body, res);
});

secured.app.get(secured.Api+'/showUserEquip/:id',(req,res)=>{
   equip.showUserEquip(req.params.id,res)
});

secured.app.post(secured.Api+'/giveBackEquip',(req,res)=>{
   equip.giveBackEquip(req.body,res);
});

secured.app.get(secured.Api+'/getPicture/:id',(req,res)=>{
    const Folder = './Pictures/';
    const arr = fs.readdirSync(Folder);
    arr.forEach(element=>{
        const str = element.split('.');
        if(str[0] === req.params.id){
            res.sendFile(__dirname+'/Pictures'+`/${element}`);
        }
    });
});

secured.app.get(secured.Api+'/getEquipPicture/:name',(req,res)=>{
    const Folder = './equipPictures/';
    const arr = fs.readdirSync(Folder);
    arr.forEach(element=>{
        const str = element.split('.');
        if(str[0] === req.params.name){
            res.sendFile(__dirname+'/equipPictures'+`/${element}`);
        }
    });
});


secured.app.post('/Picture', multer.uploadAvatar.any(),(req,res)=>{
    res.sendStatus(200).end();
});


secured.app.post(secured.Api+'/equipPicture', multerPic.uploadPic.any(),(req,res)=>{
    res.sendStatus(200).end();
});


