const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: String,
  name: String,
  updatedAt: String,
});

module.exports = mongoose.model("User", User);
