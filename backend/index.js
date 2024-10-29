require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const { urlencoded } = require("express");
const app = express();
const port = 3000;
const MONGO_URL = process.env.MONGO_URL;
const generateImageRoute =  require("./routes/GenerateImage.js");
const  posts = require( "./routes/Post.js");


app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json({limit : "50mb"}));


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});


mongoose.connect(MONGO_URL)
.then(()=>console.log("connection sucessfull"))
.catch((e) => console.log(e))

app.get('/' , (req,res)=>{
  res.send("hey developers");
})

app.use("/api/generateImage/", generateImageRoute);
app.use("/api/post/", posts);

app.listen(port , ()=>{
  console.log(`server is running at ${port}`);
})