const express = require("express");
const passport = require("../../mvc/service/passport/passport_main");
const router = express.Router();

// @method: GET
// @route: /api/register/google
// @description: Google registration route
router.get(
    "/",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  
  router.get(
    "/callback",
    (req, res, next) => {
      console.log("hello");
      console.log(req.originalUrl);
      next();
    },
    passport.authenticate("google", {
      successRedirect: "./",
      failureRedirect: "/api/register/google/failure"
    })
  );

  router.get("/failure", (req, res) => {
    res.status(401).render( "401page" ,        {message:"Login Failed!"});
  });

  module.exports = router;