const express =  require("express");
const { createPost, getAllPosts } = require("../controller/Post.js");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
 
module.exports = router