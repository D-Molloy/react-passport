const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const salt = bcrypt.genSaltSync(10);

const SignupStrategy = new Strategy(
  // passReqToCallback - get access to the entire req
  {
    passReqToCallback: true
    // can also change the username param to email by:
    // usernameField: 'email'
    // and passing email as the name of the parameter for clarity
  },
  // passport
  function(req, username, password, done) {
    const { about, email } = req.body;
    const profile = { about, username, email };

    // Check if the user is in the db searching email
    User.findOne({
      email: profile.email
    })
      .lean()
      .exec((err, user) => {
        // ERROR
        if (err) {
          return done(err, null);
        }

        // USER EXISTS
        if (user) {
          return done("Account already exists.  Please sign-in.", null);
        }

        // Create New User
        // encrypt password
        const encryptedPwd = bcrypt.hashSync(password, salt);
        //create the new user

        let newUser = new User({
          ...profile,
          password: encryptedPwd
        });

        newUser.save((error, inserted) => {
          if (error) {
            return done(error, null);
          }
          //dont send the hashed pwd to the client
          delete inserted.password;
          return done(null, inserted);
        });
      });

    // done takes 3 params
    /*
  - error -  (will execute the failureRedirect), 
  - user- userInfo you want to pass along from the db
  - extra passed (usually just use two) - flash? -used for passing data across routes
  */
    //  done is the callback passed from users.js
    // done(null, user, null);
  }
);

module.exports = SignupStrategy;
