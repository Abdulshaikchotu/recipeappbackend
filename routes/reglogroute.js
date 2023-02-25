// const { Router } = require("express")
const express = require("express");
const reglogmodel = require("../models/reglog");
const router = express.Router();
const bcrypt = require("bcrypt");
const screte = "chotu";
const jwt = require("jsonwebtoken");
router.post("/reg", async (req, res) => {
  try {
    let { email, password } = req.body;
    // console.log(req.body);
    let User = await reglogmodel.findOne({ email });
    // console.log(User);
    if (User) {
      res.json({
        status: "fail",
        msg: "user already present",
      });
    } else {
      bcrypt.hash(password, 10, async (err, hashstr) => {
        if (hashstr) {
          let reguser = await reglogmodel.create({
            email: req.body.email,
            password: hashstr,
          });
          res.json({
            status: "user registerd successfully",
            data: reguser,
          });
        }
        if (err) {
          res.json({
            status: "fail",
            msg: err.message,
          });
        }
      });
    }
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    // console.log(req.body);
    let User = await reglogmodel.findOne({ email });
    // console.log(User);
    if (!User) {
      res.json({
        status: "fail",
        msg: "user not present please register",
      });
    } else {
      bcrypt.compare(password, User.password, async (err, result) => {
        if (result) {
          let token = await jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: User._id,
            },
            screte
          );
          res.json({
            status: "user login successfully",
            data: token,
          });
        }
        if (err) {
          res.json({
            status: "fail",
            msg: err.message,
          });
        }
      });
    }
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});
module.exports = router;
