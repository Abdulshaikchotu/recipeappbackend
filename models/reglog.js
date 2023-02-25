const mongoose = require("mongoose");

const appschema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  recipedata: { type: Array, required: false },
});
const appmodel = mongoose.model("RecipeCredential", appschema);

module.exports = appmodel;
