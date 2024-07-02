const express = require("express");

require("dotenv").config();
const morgan = require("morgan");
const recipeRouters = require("./routes/Recipes");
const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://aungwann:test1234@ccm-mern-cluster.4g4bx8h.mongodb.net/?retryWrites=true&w=majority&appName=CCM-MERN-Cluster";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.use(express.json());
console.log(process.env.PORT);

app.use("/api/recipes", recipeRouters);
