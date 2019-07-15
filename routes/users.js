const express = require("express");
const router = express.Router();

// anytime you need to authenticate, bring in passport
const passport = require("../passport");

// passport.authenticate("local-signup", {
//   successRedirect: "/",
//   failureRedirect: "/home",
//   session: false
// })

// -- /auth/signup
// -- Using a custom cb for react - we don't want the redirect (above), just confirmation something happened
router.post("/signup", (req, res, next) => {
  passport.authenticate("local-signup", (error, user, info) => {
    console.log({ error, user, info });
    if (error) {
      console.log("IN ERROR");
      return res.status(500).json({
        success: false,
        error: error.message || "Internal Server Error"
      });
    }
    // setting up persistent sessions
    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err || "Internal Server Error"
        });
      }
      user.isAuthenticated = true;
      //TODO: remove pwd data
      return res.json(user);
    });

    // not persistent login
    // return res.json({
    //   message: "User is authenticated",
    //   success: true,
    //   user
    // });
    // passing the original req/res objects to passport
  })(req, res, next);
});
// /auth/signin
router.post("/signin", function(req, res, next) {
  passport.authenticate("local-signin", (error, user, info) => {
    console.log({ error, user, info });
    if (error) {
      console.log("IN ERROR");
      return res.status(500).json({
        success: false,
        error: error || "Internal Server Error"
      });
    }

    // setting up persistent sessions
    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err || "Internal Server Error"
        });
      }
      user.isAuthenticated = true;
      //TODO: remove pwd data
      return res.json(user);
    });

    // return res.json({
    //   message: "User is authenticated",
    //   success: true,
    //   user
    // });
    // passing the original req/res objects to passport
  })(req, res, next);
});
// /auth/api
router.get("/api", (req, res) => {
  // get the user info from passport
  console.log(req.user); //or req.session.passport.user fo
  res.json({ message: "hello world" });
});
router.get("/logout", function(req, res) {
  req.logout();
  res.send(true);
});

module.exports = router;
