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

app.get("/add-user/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const { data } = await axios.post(`/api/v1.0/users/${name}`);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

app.get("/edit-user/:id/:name", async (req, res) => {
  const { id, name } = req.params;

  try {
    const { data } = await axios.put(`/api/v1.0/users/${id}/${name}`);
    res.send(data);
  } catch (e) {
    if (e.response && e.response.data) {
      res.send(e.response.data);
    } else {
      console.log(e);
    }
  }
});

app.get("/delete-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.delete(`/api/v1.0/users/${id}`);
    res.send(data);
  } catch (e) {
    if (e.response && e.response.data) {
      res.send(e.response.data);
    } else {
      console.log(e);
    }
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
