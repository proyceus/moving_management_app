const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDetails = new Schema({
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

module.exports = mongoose.model("UserDetails", UserDetails);
