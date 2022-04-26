const passport = require("passport");
const User = require("../user");
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

  app.post("/login", passport.authenticate("local"), (req, res, next) => {
    const token = getToken({_id: req.user._id});
    const refreshToken = getRefreshToken({_id: req.user._id});
    User.findById(req.user._id).then(
      user => {
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
      },
      err => next(err)
    )
  });

  app.get("logout", verifyUser, (req, res, next) => {
    const {signedCookies = {}} = req;
    const {refreshToken} = signedCookies;

    User.findById(req.user._id).then(
      user => {
        const tokenIndex = user.refreshToken.findIndex(
          item => item.refreshToken === refreshToken
        )

        if (tokenIndex !== -1) {
          user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
        }

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.clearCookie("refreshToken", COOKIE_OPTIONS);
            res.send({success: true})
          }
        })
      },
      err => next(err)
    )
  });
  
};
