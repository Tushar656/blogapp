const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcrypt');

// Update user
router.put('/:userId', async(req, res)=>{
    if(req.body.userId == req.params.userId){
        if(req.body.password != ""){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.userId, {
                $set:req.body,
            }, {new: true})
            res.status(200).json(user);
        }catch(err){
            res.status(401).json(err)
        }
    }else{
        res.status(401).json("You can update only your account")
    }
})

// Delete user
router.delete('/:userId', async(req, res)=>{
    if(req.body.userId == req.params.userId){
        try{
            const user = await User.findById(req.params.userId);
            try{
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.userId)
                res.status(200).json("User has been deleted");
            }catch(err){
                res.status(401).json(err)
            }
        }catch(err){
            res.status(404).json("User not found")
        }
    }else{
        res.status(401).json("You can delete only your account")
    }
})

// GET USER
router.get('/:id', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(400).json("Get user error")
    }
})

module.exports = router;