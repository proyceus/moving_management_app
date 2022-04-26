const passport = require("passport");
const User = require("./user");
const bcrypt = require("bcryptjs");

module.exports = function (app) {
  app.use("/login", (req, res) => {
    res.send(req.body);
  });

  app.use("/", (req, res) => {
    res.send("Server beep boop")
  })
};