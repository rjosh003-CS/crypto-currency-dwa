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
    next();
  },
  passport.authenticate('local-login', {
  successRedirect: req.baseUrl + '/dashboard', // Redirect on successful login
  failureRedirect: req.baseUrl + '/login', // Redirect if login fails
  failureFlash: true,
  })
);

module.exports = router;
