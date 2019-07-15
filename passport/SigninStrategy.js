const Strategy = require("passport-local").Strategy;

const LoginStrategy = new Strategy(function(username, password, done) {
  // what should happen once the user is signed up
});

module.exports = LoginStrategy;
