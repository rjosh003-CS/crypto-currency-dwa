const express = require("express");
const passport = require("passport");
const router = express.Router();

// @method: GET
// @route: /api/register/google
// @description: Google registration route
router.get(
    "/",
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );
  
  module.exports = router;