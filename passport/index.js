const passport = require("passport");

//import all strategies
const SignupStrategy = require("./SignupStrategy");
const SigninStrategy = require("./SigninStrategy");
// const GoogleStrategy = require("./GoogleStrategy");
// const GitHub = require("./GitHub");

// First parameter can be any name you prefer
passport.use("local-signin", SigninStrategy);
passport.use("local-signup", SignupStrategy);

module.exports = passport;
