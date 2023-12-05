const passport = require("passport");
const localStrategy = require("./localStrategy");
const googleStrategy = require("./googleStrategy");

// Configure local strategy
passport.use(localStrategy);

// Configure Google strategy
passport.use(googleStrategy);

// Export the configured Passport instance
module.exports = passport;
