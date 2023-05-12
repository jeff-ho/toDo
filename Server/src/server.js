const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
const PORT = process.env.PORT;

app.use(cors());

const TodoItemRoute = require("../routes/todoItems");
app.use("/", TodoItemRoute);

const startServer = async () => {
  await mongoose.connect(process.env.DB_CONNECT);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
