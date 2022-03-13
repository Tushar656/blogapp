const router = require("express").Router();
const Catagory = require('../models/Cat');

router.post('/', async(req, res)=>{
    try{
        const cat = new Catagory(req.body);
        const savedCat = await cat.save();
        res.status(200).json(savedCat)
    }catch(err){
        res.status(500).json("Cat error")
    }
})

router.get('/', async(req, res)=>{
    try{
        const Cat = await Catagory.find();
        res.status(200).json(Cat)
    }catch(err){
        res.status(500).json("Cat error")
    }
})

module.exports = router;