import * as dotenv from "dotenv";
import express from "express";
import axios from "axios";
import router from "./routes/api-v1.0.js";

const { parsed: process } = dotenv.config();
const PORT = process.PORT || 3000;

axios.defaults.baseURL = `http://localhost:${PORT || 3000}`;

const app = express();

app.use(router);
app.use(express.json());

app.get("/users", async (req, res) => {
  const { data } = await axios.get("/api/v1.0/users");
  res.send(data);
});

app.get("/add-user", async (req, res) => {
  const name = "Вася";
  try {
    const { data } = await axios.post("/api/v1.0/add-user", {
      body: { name: name },
    });
    console.log(data);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
