const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Session = new Schema({
    refreshToken: {
        type: String,
        default: ""
    },
});

const User = new Schema ({
    username: String,
    password: String,
    move: [{
        name: String,
        moveDate: Date,
        boxNumberTotal: Number,
        boxes: [{
            boxNumber: Number,
            items: [{
                itemName: String,
                itemContents: String
            }]
        }]
    }],
    refreshToken: [Session]
})

//Remove refreshToken from response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    }
});

User.plougin(passportLocalMongoose);

module.exports = mongoose.model("User", User);

