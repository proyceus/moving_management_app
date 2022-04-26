const passport = require("passport");
const User = require("../user");
const bcrypt = require("bcryptjs");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate");

module.exports = function (app) {
  
  app.post("/signup", (req, res, next) => {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          const token = getToken({_id: user._id});
          const refreshToken = getRefreshToken({_id: user._id});
          user.refreshToken.push({refreshToken});
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err)
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({success: true, token})
            }
          })
        }
      }
    )
  });



  
};
