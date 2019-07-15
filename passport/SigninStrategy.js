const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const salt = bcrypt.genSaltSync(10);

const LoginStrategy = new Strategy({ usernameField: "email" }, function(
  email,
  password,
  done
) {
  // what should happen once the user is signed up

  // Check if the user is in the db searching email
  User.findOne({ email })
    .lean()
    .exec((err, user) => {
      // ERROR
      if (err) {
        return done(err, null);
      }

      // USER EXISTS
      if (!user) {
        return done("No User associated with that email.", null);
      }

      // check the password inputted against the hashed password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return done("Email or password not valid.", null);
      }

      const mongoRes = {
        _id: user._id,
        about: user.about,
        username: user.username,
        email: user.email
      };
      return done(null, mongoRes);
    });
});

module.exports = LoginStrategy;
