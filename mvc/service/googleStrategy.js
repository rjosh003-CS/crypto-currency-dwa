const passport = require("passport");
const env = require("env");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const port = env.port;
const CLIENT_ID = env.CLIENT_ID;
const CLIENT_SECRET = env.CLIENT_SECRET;

// Configure Google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: `http://localhost:${port}/auth/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user authentication logic here
      // This function will be called when a user successfully authenticates with Google
      // You can access the user's profile information from the 'profile' parameter
      // You can also store the user's information in your database or perform any other necessary actions
      // Call the 'done' function to indicate that the authentication process is complete
      done(null, profile);
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  // Serialize the user object and store it in the session
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
  // Retrieve the user object from the session
  done(null, user);
});

module.exports = passport;
