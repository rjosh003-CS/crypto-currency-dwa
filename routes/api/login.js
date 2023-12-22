// ./route/api/login.js
const express = require("express");
const passport = require("../../mvc/service/passport/passport_main");
const router = express.Router();

// POST route for login
// @route: /api/login
router.post(
  "/",
  async (req, res, next) => {
    console.log("inside login api route");
    console.log(req.body);

    // passport authencation for login
    passport.authenticate('local-login', {
      successRedirect: process.env.BASE_URL + '/dashboard', // Redirect on successful login
      failureRedirect: process.env.BASE_URL + '/login', // Redirect if login fails
      failureFlash: true,
    })(req, res); 
});

module.exports = router;
