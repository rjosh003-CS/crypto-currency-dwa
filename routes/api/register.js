const express = require("express");
const passport = require("../../mvc/service/passport/passport_main");
const router = express.Router();

const valid_email = (email) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(regex);
};

const valid_password = (password, min_length) => {
  return ( password.length >= min_length && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/));
};

// Middleware for validating the register form
const validate_register_form = (req, res, next, err) => {
  const { username, password, email } = req.body;

  // check for required fields
  if (!username || !password || !email) {
    return res.status(400).json(new Error("Missing required fields"));
  }
  // check for valid email 
  if (!valid_email()) {
    return res.status(400).json(new Error("Invalid email format"));
  }

  // check password contain Capital and special characters and length atleast 8 characters.
  if (valid_password(password, 8)) {
    return res.status(400).json(
      new Error(
        "Password must contain at least one Capital letter, one small letter, one number and one special character"
      )
    );
  }
  console.log("validation done!");
  next();
};

// POST route for registering a user
// @route: /api/register
router.post("/", validate_register_form,  passport.authenticate("local"), (req, res) =>{
  console.log("passport authentication Successfull!");
});

module.exports = router;
