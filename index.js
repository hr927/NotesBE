const express = require("express");
const { connection } = require("./configs/db");
const { authenticate } = require("./Middleware/authenticate.middleware");
const { noteRouter } = require("./Routes/Note.routes");
const { userRouter } = require("./Routes/User.routes");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log("Server Running at" + process.env.port);
});
