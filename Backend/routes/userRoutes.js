const User = require("../user");

module.exports = function (app) {
  // app.get("/me", (req, res, next) => {
  //   User.findOne({ email: req.query.email }).then((user) => {
  //     res.send(user);
  //   });
  // });

  app.get("/user", (req, res) => {
    User.findOne({ email: req.query.email }).then((data) => res.send(data));
  });

  app.post("/addmove", (req, res, next) => {
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

    User.findOne({ email: req.body.email }).then(
      (user) => {
        user.move.push(move);

        user.save((err, user) => {
          if (err) {
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
    User.findOne({ email: req.body.email }).then(
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
