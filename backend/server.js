const express = require("express");

require("dotenv").config();
const morgan = require("morgan");
const recipeRouters = require("./routes/Recipes");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouters = require("./routes/Users");
const cookieParser = require("cookie-parser");
// const AuthMiddleware = require("./middleware/AuthMiddleware");
const corn = require("node-cron");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const sendEmail = require("./controller/helper/sendEmail");
const AuthMiddleware = require("./middleware/AuthMiddleware");

const app = express();
app.use(express.static("public"));

const mongoURL =
  "mongodb+srv://aungwann:test1234@ccm-mern-cluster.4g4bx8h.mongodb.net/?retryWrites=true&w=majority&appName=CCM-MERN-Cluster";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);

      // schedule for every 5 minutes
      //   corn.schedule("*/5 * * * *", async () => {
      //     console.log("running a task every 5 minutes");
      //     let user = await User.findByIdAndUpdate(
      //       "61f3c7c7d9c9d4d4c4c4c4c4",
      //     {  name : "saiaungwann " + Date.now()}
      //     )
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Use Cors only when developing only
// ---------- WARNING: DO NOT USE IN PRODUCTION -----------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // Cross-Origin Resource Sharing (CORS)

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.use(express.json());
console.log(process.env.PORT);

app.use(cookieParser());

app.use("/api/recipes", AuthMiddleware, recipeRouters);

app.use("/api/users", userRouters);
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/set-cookie", (req, res) => {
  res.setHeader("Set-Cookie", "name=saiaungwann");
  res.cookie("name", "aungwann");
  res.cookie("important-key", "value", { httpOnly: true });
  return res.send("cookie already set");
});

app.get("/get-cookie", (req, res) => {
  let cookies = req.cookies;
  return res.json(cookies);
});

app.get("/send-email", async (req, res) => {
  try {
    sendEmail({
      viewFileName: "email",
      data: { name: "Mg Mg" },
      form: "aungwann@gmail.com",
      to: "mgmg@gmail.com",
      subject: "Attention",
    });
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email
    // main().catch(console.error);s
    return res.json({ message: "Email sent" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
});
