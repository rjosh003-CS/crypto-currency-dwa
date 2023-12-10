const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/users_schema"); // Assuming you have a User model

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Assuming email is the username field
      passwordField: "password", // Assuming password is the password field
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found or password doesn't match, return error
        if (!user?.isValidPassword(password)) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // If user found and password matches, return user
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
