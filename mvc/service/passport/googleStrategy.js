const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.CALL_BACK_URL;

// console.log(`${GOOGLE_CALLBACK_URL}`);

// Configure Google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user authentication logic here
      // This function will be called when a user successfully authenticates with Google
      // You can access the user's profile information from the 'profile' parameter
      // You can also store the user's information in your database or perform any other necessary actions
      // Call the 'done' function to indicate that the authentication process is complete
      console.log(profile);
      done(null, profile);
    }
  )
);

module.exports = passport;
