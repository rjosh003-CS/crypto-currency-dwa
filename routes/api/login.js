// ./route/api/login.js
const express = require("express");
const passport = require("../../utils/passport/passport_main");
const router = express.Router();

const { encrypt, compare } = require("../../mvc/controller/helperController");

// POST route for login
router.post(
  "/",
  async (req, res, next) => {
    console.log("inside login api route");
    console.log(req.body);
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
