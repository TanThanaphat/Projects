const {Users, Item} = require('../../config/db.js');
const express = require('express');
const router = express.Router();
//iduser
router.put('/put/:id',async (req, res) => {
  try{
    const update = await Users.findByIdAndUpdate(req.params.id, {
      "name": req.body.name,
      "userName": req.body.userName,
      "password": req.body.password
    });

    return res.status(200).json({"message":"update sucess"})
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).json({"eroor":err.message});
  }
})


router.post('/login',async (req, res) => {
  try{
    const user = await Users.findOne({"userName":req.body.userName});
    if(user.password === req.body.password){
      return res.status(200).json({"_id":user._id});
    }
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).json({"eroor":err});
  }
});



router.post('/creact',async (req,res) => {
  try{
    const newUser = new Users(req.body);
    await newUser.save();
    return res.status(201).send("Ok");
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).json({"eroor":err});
  }
    
});

router.delete('/delete/:id',async (req,res) => {
  try{
    let found = req.params.id;
    await Users.findByIdAndDelete(found);
    return res.status(200).json({"ok": "ok"});
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).json({"eroor":err});
  }
    
});

module.exports = router;


// router.get('/:id', (req, res) => {
//    let found = users.some(user => user.id === parseInt(req.params.id));
//    if(found) {
//     res.json(users.filter(user => user.id === parseInt(req.params.id)));
//    } else {
//     res.status(400).json({ msg: `No users with the id of ${req.params.id}`});
//    }
// });

// router.post('/', (req, res) => {
//   const newUser = {
//     id: req.body.id,
//     name: req.body.name,
//     email: req.body.email
//   }
//   if(!newUser.name || !newUser.email) {
//     return res.status(400).json({ msg: 'plase include your name and email' });
//   } 

//   users.push(newUser);
//   res.json(users);
// });

// router.put('/:id', (req, res) => {
//   let found = users.some(user => user.id === parseInt(req.params.id));
 
//   if(found){
//      const updUser = req.body;
//      users.forEach(user => {
//         if (user.id === parseInt(req.params.id)){
//               user.name = updUser.name ? updUser.name : user.name;
//               user.email = updUser.email ? updUser.email : user.email;

//               res.json({msg: 'User updated', user });
//         }
//      })
//   } else {
//     res.status(400).json({ msg: `No user with this id of ${req.params.id}`})
//   }
// });

// //deleat user
// router.delete('/:id', (req, res) => {
//   let found = users.some(user => user.id === parseInt(req.params.id));

//   if(found){
//     res.json({
//       msg: 'Member deleat',
//       users: users.filter(user => user.id !== parseInt(req.params.id))
//     })
//   } else {
//     res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
//   }
// })

// 
//เข้าเว็ปโดยสร้าง เร้า
//app.get('/', (req, res) => {
    //ส่งไฟไปที่หน้าเว็ป เมื่อเป็นหน้าแรก dirname = บอกตำแหน่งไฟว่าไม่ว่าไฟจะอยู่ที่ไหนในเครื่อง
  //  res.sendFile(path.join(__dirname, 'public', 'index.html'));
//})