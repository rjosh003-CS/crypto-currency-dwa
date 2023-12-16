// ./mvc/service/passport/localStrategy.js
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/userSchema"); // Assuming you have a User model
const { compare } = require("../../mvc/controller/helperController");

// todo!
// const UserController = require("../../controller/users_controller");

// ----------------------------------------------------------local Strategy-------------------------------------------------------------------------------

const localStrategy = new LocalStrategy(
  {
    usernameField: "email", // Assuming email is the email field
    passwordField: "password", // Assuming password is the password field
  },
  async (email, password, done) => {
    console.log("inside local passort Strategy");
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);

    try {
      const user = await User.findOne({ email });

      let isMatch = null;

      if (user) {
        isMatch = await compare(password, user.password);
        console.log(`isMatch: ${isMatch}`);
      }

      if (!user || !isMatch) {
        return done(null, false, {
          errror: {
            status: "Input error!",
            message: "Incorrect email or password",
          },
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = localStrategy;
