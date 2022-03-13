const express = require("express");

const app = express();
app.use(express.json());

const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/cat");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogapp')
.then(console.log("Connection successfull"))
.catch((err) => console.log("Not connected to mongodb"));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/cat', catRoute);

app.use("/images", express.static(path.join(__dirname, "/images")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name)
    }
})
const upload = multer({storage: storage});
app.post('/api/upload', upload.single("file"), (req, res)=>{
    res.status(200).json("File has been uploaded");
})


app.listen("5000", ()=>{
    console.log("Server run at port 5000")
})
