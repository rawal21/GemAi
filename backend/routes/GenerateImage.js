const express = require( "express");
const { generateImage } = require( "../controller/GenrateImage.js");

const router = express.Router();

router.post("/", generateImage);

module.exports = router;