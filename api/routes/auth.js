const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

// Register
router.post('/register', async(req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            password: hashPass,
            email: req.body.email,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
})

// LOGIN
router.post('/login', async(req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("User not found");

        const matchPass = await bcrypt.compare(req.body.password , user.password);
        !matchPass && res.status(400).json("Wrong password");

        const {password, ...others} = user._doc;

        res.status(200).json(others);
    }catch(err){
        res.status(500).json("Login err");
    }
})

module.exports = router;