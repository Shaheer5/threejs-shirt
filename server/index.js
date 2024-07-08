import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import dalleRoutes from "./routes/dalle.routes.js";

// to get all env(s)
dotenv.config();

const app = express();

// allow crossOrigins
app.use(cors());

app.use(express.json({ limit: "50mb" }));

// consume routes as middleware
app.use("https://api.openai.com/v1/images/generations", dalleRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL-E - BackEnd is RUNNIG!" });
});

app.listen(8080, () => console.log("Server has started on port 8080"));
