const passport = require("passport");
const User = require("../user");
const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../authenticate");
const jwt = require("jsonwebtoken");

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
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token });
            }
          });
        }
      }
    );
  });

  app.post("/login", passport.authenticate("local"), (req, res, next) => {
    const token = getToken({ _id: req.user._id });
    const refreshToken = getRefreshToken({ _id: req.user._id });
    User.findById(req.user._id).then(
      (user) => {
        user.refreshToken.push({ refreshToken });
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.send({ success: true, token });
          }
        });
      },
      (err) => next(err)
    );
  });

  app.get("/me", verifyUser, (req, res, next) => {
    res.send(req.user);
  });

  app.get("/logout", verifyUser, (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    User.findById(req.user._id).then(
      (user) => {
        const tokenIndex = user.refreshToken.findIndex(
          (item) => item.refreshToken === refreshToken
        );

        if (tokenIndex !== -1) {
          user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
        }

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.clearCookie("refreshToken", COOKIE_OPTIONS);
            res.send({ success: true });
          }
        });
      },
      (err) => next(err)
    );
  });

  app.post("/addmove", (req, res, next) => {
    User.findById(req.body._id).then(
      (user) => {
        const move = {
          name: req.body.name,
          moveDate: req.body.moveDate,
          boxNumberTotal: 1,
          boxes: [
            {
              boxNumber: 1,
              items: [],
            },
          ],
        };
        user.move.push(move);

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.send({ success: true });
          }
        });
      },
      (err) => next(err)
    );
  });

  app.post("/additem", (req, res, next) => {
    User.findById(req.body._id).then(
      (user) => {
        const findMove = () => {
          for (let i = 0; i < user.move.length; i++) {
            try {
              if (user.move[i].name === req.body.moveName) {
                return i;
              }
            } catch (err) {
              res.send(err);
            }
          }
        };
        const correctMove = findMove();
        if (user.move[correctMove].boxes.length < req.body.boxNumber) {
          user.move[correctMove].boxes.push({
            boxNumber: req.body.boxNumber,
            items: [],
          });
          user.move[correctMove].boxNumberTotal =
            user.move[correctMove].boxNumberTotal + 1;
        }

        const correctBox = req.body.boxNumber - 1;
        const item = {
          itemName: req.body.name,
          dateAdded: req.body.dateAdded,
          boxNumber: req.body.boxNumber,
          moveName: req.body.moveName,
        };

        user.move[correctMove].boxes[correctBox].items.push(item);

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.send({ success: true });
          }
        });
      },
      (err) => next(err)
    );
  });

  app.post("/refreshToken", (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    if (refreshToken) {
      try {
        const payload = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const userId = payload._id;
        User.findOne({ _id: userId }).then(
          (user) => {
            if (user) {
              // Find the refresh token against the user record in database
              const tokenIndex = user.refreshToken.findIndex(
                (item) => item.refreshToken === refreshToken
              );

              if (tokenIndex === -1) {
                res.statusCode = 401;
                res.send("Unauthorized");
              } else {
                const token = getToken({ _id: userId });
                // If the refresh token exists, then create new one and replace it.
                const newRefreshToken = getRefreshToken({ _id: userId });
                user.refreshToken[tokenIndex] = {
                  refreshToken: newRefreshToken,
                };
                user.save((err, user) => {
                  if (err) {
                    res.statusCode = 500;
                    res.send(err);
                  } else {
                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                    res.send({ success: true, token });
                  }
                });
              }
            } else {
              res.statusCode = 401;
              res.send("Unauthorized");
            }
          },
          (err) => next(err)
        );
      } catch (err) {
        res.statusCode = 401;
        res.send("Unauthorized");
      }
    } else {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  });
};
