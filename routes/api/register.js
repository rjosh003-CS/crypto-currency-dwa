const express = require("express");
const router = express.Router();

const {validate_register_form} = require("./validation_functions");
const passport = require("../../mvc/service/passport/passport_main");

const User = require("../../mvc/models/userSchema");
const { createUser } = require("../../mvc/controller/userController");

// POST route for registering a user
// @route: /api/register
router.post(
  "/",
  (req, res, next) => {
    const { password, password2 } = req.body;
    console.log(`password: ${password}, password2: ${password2}`);
    next();
  },
  validate_register_form,
  (req, res, next) => {
    let name = null;
    if (!req.body.middlename && !req.body.lastname) {
      name = req.body.firstname;
    } else if (!req.body.middlename) {
      name = req.body.firstname + " " + req.body.lastname;
    } else {
      name =
        req.body.firstname +
        " " +
        req.body.middlename +
        " " +
        req.body.lastname;
    }

    req.body.displayname = name;
    next();
  },
  passport.authenticate("local-register", {
    successRedirect: "/", // Redirect on successful registration
    failureRedirect: "/register", // Redirect if registration fails
    failureFlash: true
  })
);


module.exports = router;
