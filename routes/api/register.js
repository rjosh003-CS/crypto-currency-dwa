const express = require("express");
const router = express.Router();

const {register} = require("../../mvc/controller/routeController");

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
    const err = req.body.errors;
    delete req.body.errors;

    if (err) {

      const formData = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2
      };

      console.log(err);

      const errorMessages = Object.keys(err).map(key => ({
        status: "Validation Error",
        message: err[key].msg // Assuming each error object has a 'msg' property
      }));

      formData.errors = errorMessages;

      console.log(formData);
      
      req.flash("validationError", JSON.stringify(formData));
      res.redirect( req.baseUrl + "/register");
      console.log("redirect route to register");
      return;
    }

    console.log("pre auth end");
    next();
  },
  passport.authenticate("local-register", {
    successRedirect: req.baseUrl + "/", // Redirect on successful registration
    failureRedirect: req.baseUrl + "/register", // Redirect if registration fails
    failureFlash: true
  })
);


module.exports = router;
