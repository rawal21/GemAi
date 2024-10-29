const dotenv = require("dotenv");
const axios = require("axios");
const { createError } = require("../Error.js");

dotenv.config();

// Controller to generate Image using Hugging Face API
const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Hugging Face inference API URL and token from .env file
    const apiUrl = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";
    const apiToken = process.env.HUGGINGFACE_API_KEY;

    // Make a POST request to Hugging Face API for image generation
    const response = await axios.post(
      apiUrl,
      { inputs: prompt }, // Sending prompt to the model
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        responseType: 'arraybuffer' // Receive binary data (image)
      }
    );

    // Convert the image to base64
    const generatedImage = Buffer.from(response.data, 'binary').toString('base64');

    console.log(generatedImage)

    // Respond with the base64 image
    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        error.response?.status || 500,
        error.response?.data?.error || error.message
      )
    );
  }
};

module.exports = { generateImage };
