const express = require("express");
const router = express.Router();
const recipemodel = require("../models/reglog");

// router.post("/token", async (req, res) => {
//   let user = req.user;
//   let ord=req.body
//   let
//   try {
//     const recipedata = await recipemodel.create({
//       recipename: req.body.recipename,
//       author: req.body.author,
//       image: req.body.image,
//       ingredients: req.body.ingredients,
//       recipeinstruction: req.body.recipeinstruction,
//       member: user,
//     });
//     res.json({
//       status: "success",
//       data: recipedata,
//     });
//   } catch (e) {
//     res.json({
//       status: "fail",
//       msg: e.message,
//     });
//   }
// });

router.post("/token", async (req, res) => {
  try {
    let user = req.user;

    const ord = req.body;
    // console.log(ord);
    const user_data = await recipemodel.find({ _id: user });
    let updates_order = await recipemodel.updateMany(
      { _id: user },
      { $push: { recipedata: ord } }
    );
    res.status(200).json({
      status: "Success Full updates orders",
      massage: user_data,
    });
  } catch (e) {
    res.status(401).json({
      status: "Fail to upload orders in database!!",
      massage: e.massage,
    });
  }
});

router.get("/token", async (req, res) => {
  userdata = req.user;
  try {
    const recipedata = await recipemodel.find({ _id: userdata });
    res.json({
      status: "success",
      data: recipedata,
    });
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});
router.get("/token", async (req, res) => {
  userdata = req.user;
  try {
    const recipedata = await recipemodel.find();
    res.json({
      status: "success",
      data: recipedata,
    });
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});

router.put("/token", async (req, res) => {
  member = req.user;
  console.log(member);
  console.log(req.body);
  try {
    let bookdata = await recipemodel.updateOne(
      { _id: member },
      { $set: { recipedata: req.body } }
    );
    res.json({
      status: "success",
      data: bookdata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});

router.delete("/token", async (req, res) => {
  mem = req.user;
  try {
    let bookdata = await recipemodel.deleteOne({ _id: mem });
    res.json({
      status: "success",
      data: bookdata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});
module.exports = router;
