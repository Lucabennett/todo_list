const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mern_todo")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/todos", require("./routes/todoRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
