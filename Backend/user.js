const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: String,
  name: String,
  updatedAt: String,
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
});

module.exports = mongoose.model("User", User);
