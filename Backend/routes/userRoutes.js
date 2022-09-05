const passport = require("passport");
const User = require("../user");
const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../authenticate");

module.exports = function (app) {
  app.post("/signup", (req, res, next) => {
    //if
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
    User.register(
      new User({
        email: req.body.email,
        name: req.body.nickname,
        updatedAt: req.body.updated_at,
      }),
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

  app.get("/me", verifyUser, (req, res, next) => {
    res.send(req.user);
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
};
