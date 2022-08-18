const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema({
  username: String,
  password: String,
  move: [
    {
      name: String,
      moveDate: Date,
      boxNumberTotal: { type: Number, default: 0 },
      boxes: [
        {
          boxNumber: Number,
          items: [
            {
              itemName: String,
              dateAdded: Date,
              boxNumber: Number,
              moveName: String,
            },
          ],
        },
      ],
    },
  ],
  refreshToken: [Session],
});

//Remove refreshToken from response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
