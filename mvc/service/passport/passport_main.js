const passport = require("passport");
const localStrategy = require("./localStrategy");
const googleStrategy = require("./googleStrategy");

// Configure local strategy
passport.use("local", localStrategy);

// Configure Google strategy
passport.use("google", googleStrategy);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Export the configured Passport instance
module.exports = passport;