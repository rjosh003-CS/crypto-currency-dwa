const express = require("express");
const passport = require("../../mvc/service/passport/passport_main");
const router = express.Router();

// @method: GET
// @route: /api/register/google
// @description: Google registration route
router.get(
  "/",
  (req, res, next) => {
    console.log("\n\n" + "inside google route");

    console.log({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
    });
    console.log("going for passport authentication for the google user");
    next();
  },

  authenticating the user using passport oauth
  passport.authenticate("google")
);



// @method: GET
// @route: /api/register/google/callback
// @description: Google callback route
  router.get(
    "/callback",

    // checking the flow in the callback route
    (req, res, next) => {
      console.log("\n\n" + "inside google callback route");
      console.log(req.originalUrl);
      console.log(req.url);
      console.log(`callback url :  ${process.env.CALL_BACK_URL}`);
      console.log("callback url authentication to passport");

      // authenticating the response back from google
      passport.authenticate("google", {
        successRedirect: process.env.BASE_URL + "/",
        failureRedirect: process.env.BASE_URL + "/login"
      })(req, res)
    }
  );

  module.exports = router;