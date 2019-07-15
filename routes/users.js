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
        message: "Authentication error.  Please try again.",
        success: false,
        error: error.message || "Internal Server Error"
      });
    }

    return res.json({
      message: "User is authenticated",
      success: true,
      user
    });
    // passing the original req/res objects to passport
  })(req, res, next);
});

router.post("/signin", function(req, res, next) {});

module.exports = router;
