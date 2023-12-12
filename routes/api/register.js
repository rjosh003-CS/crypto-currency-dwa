const express = require("express");
const router = express.Router();

const {validate_register_form} = require("./validation_functions");
const passport = require("../../mvc/service/passport/passport_main");

// POST route for registering a user
// @route: /api/register
router.post(
  "/",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  validate_register_form,
  passport.authenticate("local", {
    successRedirect: "./",
    failureRedirect: "./failure"
  })
);


module.exports = router;
