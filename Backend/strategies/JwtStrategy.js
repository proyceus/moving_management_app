const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt
const User = require("../user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

//Used by authentication requests to deserialize the user
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        //Check against the DB only if necessary
        User.findOne({_id: jwt_payload._id}, function(err, user) {
            if (err) {
                console.log("FOUND ME")
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                //or you could create a new account
            }
        })
    })
)
