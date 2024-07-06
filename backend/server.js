const express = require("express");

require("dotenv").config();
const morgan = require("morgan");
const recipeRouters = require("./routes/Recipes");
const mongoose = require("mongoose");
const cors = require("cors");

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

// Use Cors only when developing only
// ---------- WARNING: DO NOT USE IN PRODUCTION -----------
app.use(cors()); // Cross-Origin Resource Sharing (CORS)

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.use(express.json());
console.log(process.env.PORT);

app.use("/api/recipes", recipeRouters);
