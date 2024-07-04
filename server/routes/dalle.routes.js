import express from "express";
import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E routes" });
});

// Posting image to front-end app
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.images.generate({
      // model: "dall-e-2",
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;
    console.log(image);
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("Error generating image: ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
