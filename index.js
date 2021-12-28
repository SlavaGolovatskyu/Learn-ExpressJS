import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/api-v1.0.js";

const { parsed: process } = dotenv.config();

app.use(router);
app.use(express.json());

const app = express();

const PORT = process.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
