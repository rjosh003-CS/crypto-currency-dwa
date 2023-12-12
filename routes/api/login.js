
const express = require("express");
const passport = require("passport");
const router = express.Router();

// POST route for login
router.post("/", (req, res, next) => {
  console.log(req.body);
  next();
}, passport.authenticate("local", {
  successRedirect: "./success",
  failureRedirect: "./failure",
  failureFlash: true
}));

module.exports = router;
