// ./mvc/service/passport/passport_main.js

const passport = require("passport");

const User = require("../../models/userSchema"); // Assuming you have a User model

const { local_login, local_register} = require("./localStrategy");
// const googleStrategy = require("./googleStrategy");

const mongoose = require("mongoose");

// Serialize user
passport.serializeUser((user, done) => {
  // Serialize using the user's email
  done(null, user.email);
});

// Deserialize user
passport.deserializeUser(async (email, done) => {
  try {
    // Deserialize using the email to find the user
    const user = await User.findOne({ email });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Configure local strategy
passport.use("local-login", local_login);
passport.use("local-register", local_register);

// Configure Google strategy
// passport.use("google",  googleStrategy);

// Export the configured Passport instance
module.exports = passport;
