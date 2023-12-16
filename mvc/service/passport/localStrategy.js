// ./mvc/service/passport/localStrategy.js
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/userSchema"); // Assuming you have a User model
const { encrypt, compare } = require("../../controller/helperController");
// const { register } = require("../../controller/routeController");
const {getRandomProfilePic} = require("../../controller/helperController");


// ----------------------------------------------------------local Strategy--------------------------------------------------

// local strategy for login
const local_login = new LocalStrategy(
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

// local strategy for register
const local_register = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: 'email', // Assuming email is the username field
    passwordField: 'password', // Assuming password is the password field
  },
  async (req, email, password, done) => {
    try {
      console.log("inside passport strategy: registration")
      const user = await User.findOne({ email });
      
      if (user) {
        console.log("user already existed!")
        return done(null, false, { message: 'Email already exists' });
      }

      const hashedPassword = await encrypt(password);

      const newUserDetails = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        picture: getRandomProfilePic(
          req.body.firstname.charAt(0),
          req.body.lastname.charAt(0)
        ),
        password: hashedPassword,
        displayname: req.body.displayname,
      };

      const newUser = new User(newUserDetails);
      await newUser.save();
      console.log("new user save in passport session")
      return done(null, newUser); // Return the newly registered user
    } catch (err) {
      console.log("err: passport registration")

      return done(err);
    }
  }
);

module.exports = {local_login, local_register};
