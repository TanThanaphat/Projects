const {Item, Users} = require('../../config/db.js');
const express = require('express');
const { route } = require('./users.js');
const router = express.Router();
//idแต่ละก่อง


router.get('/get/:id_user/:month/:year/:limit',async (req, res) => {
  try{
    const itemformIDsort = await Item.find({"id_user":req.params.id_user , "month":req.params.month, "year":req.params.year}).sort({day:1}).limit(req.params.limit);
    return res.json({itemformIDsort});
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).json({"error":err.message});
  }
});



router.get('/get/:id_user/:month/:year',async (req, res) => {
  try{
    const itemformID = await Item.find({"id_user":req.params.id_user , "month":req.params.month, "year":req.params.year});
    return res.json({itemformID});
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).json({"error":err.message});
  }
});




router.put('/put/:id',async (req, res) => {
  try{
    const update = await Item.findByIdAndUpdate(req.params.id, {
      "todo": req.body.todo
    });

    return res.status(200).json({"message":"update sucess", "data": update})
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).json({"error":err.message});
  }
})

router.post('/creact',async (req,res) => {
     try{
      const newUser = new Item(req.body);
      await newUser.save();
       return res.status(201).send("Ok");
     }
     catch(err)
     {
       console.log(err);
       return res.status(500).json({"error":err});
     }
  });
  router.delete('/delete/:id',async (req,res) => {
    try{
      let found = req.params.id;
      await Item.findByIdAndDelete(found);
      return res.status(200).json({"ok":"ok"});
    }
    catch(err)
    {
      console.log(err);
      return res.status(500).json({"error":err});
    }
      
  });

router.get('/test/items',async (req,res) => {
    return  res.json(await  Item.find());
  });
  
router.get('/test/items/:id',async (req,res) => {
    return  res.json(await  Item.findById(req.params.id));
  });

module.exports = router;


