const passport = require("passport");
const User = require("../models/user");
//import all strategies
const SignupStrategy = require("./SignupStrategy");
const SigninStrategy = require("./SigninStrategy");
// const GoogleStrategy = require("./GoogleStrategy");
// const GitHub = require("./GitHub");

// could also serialize by user.id instead of user.email - just update the deserialize to .findById
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

// deserialize gets hit first by every request
// any req, even if not associated with passport will be deserialized
// changing up the default by looking for the email instead of the id
passport.deserializeUser(function(email, done) {
  User.findOne({ email }, function(err, user) {
    done(err, user); //where the user is getting added onto req
  });
});

// First parameter can be any name you prefer
passport.use("local-signin", SigninStrategy);
passport.use("local-signup", SignupStrategy);

module.exports = passport;
