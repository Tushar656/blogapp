const router = require("express").Router();
const Post = require("../models/Post");


// Create post 
router.post('/', async(req, res)=>{
    try{
        const post = new Post(req.body);
        const savedpost = await post.save();
        res.status(200).json(savedpost);
    }catch(err){
        res.status(400).json("create post error")
    }
})

// Update user
router.put('/:postId', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        if(post.username == req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.postId,
                    {
                        $set: req.body
                    },
                    {new: true}
                )
                res.status(200).json(updatedPost);
            }catch(err){
                res.status.json("Update post err")
            }
        }else{
            res.status(401).json("You can update only your post")
        }
    }catch(err){
        res.status.json("Update post err")
    }
})

// Delete post
router.delete('/:postId', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        if(post.username == req.body.username){
            try{
                const updatedPost = await Post.findByIdAndDelete(req.params.postId);
                res.status(200).json("Post has been deleted");
            }catch(err){
                res.status.json("Delete post err")
            }
        }else{
            res.status(401).json("You can delete only your post")
        }
    }catch(err){
        res.status.json("delete post err")
    }
})

// GET POST
router.get('/:id', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
        res.status(400).json("Get Post error")
    }
})

//Get all posts
router.get('/', async(req, res)=>{
    const userName = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(userName){
            posts = await Post.find({username: userName});
        }else if(catName){
            posts = await Post.find({categories: {
                $in: [catName],
            }})
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(400).json("Gat all post error")
    }
})

module.exports = router;