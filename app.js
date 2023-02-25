const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.port || 5000;
const screte = "chotu";
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const mongo_url = process.env.monogurl || "mongodb://0.0.0.0:27017/RecipeApp";

const reglogroute = require("./routes/reglogroute");
const reciperouter = require("./routes/reciperoute");
app.use("/api", reglogroute);

app.use("/token", async (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, screte, (err, decoded) => {
      if (err) {
        return res.json({
          status: "not a valid token",
          msg: err.message,
        });
      }
      req.user = decoded.data;
      next();
    });
  } else {
    return res.json({
      status: "fail token not found",
    });
  }
});
app.use(reciperouter);
mongoose.connect(mongo_url, (err, db) => {
  if (err) {
    console.log(err.message);
  }
  if (db) {
    console.log("connected to database");
  }
});
app.listen(port, () => console.log("server app at" + port));
