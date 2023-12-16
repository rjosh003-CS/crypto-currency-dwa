// ./mvc/service/passport/googleStrategy.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../../models/userSchema");

const mongoose = require("mongoose");

const uuidv4 = require("uuidv4");
const colour = require("../../color_code");

// Configure Google authentication
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALL_BACK_URL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: ["profile", "email"],
    state: true,
  },

  // verify function to check if the user is already in the database else add user to the database
  async function verify(accessToken, refreshToken, profile, done) {
    // todo!
    console.log(`${colour.red}inside googleStrategy${colour.reset}`);

    console.log(`${colour.red}accessToken:${colour.reset} ${accessToken}`);
    console.log(
      `${colour.red}profile: ${colour.reset}${JSON.stringify(profile)}`
    );

    //  error check for access token and profile
    if (!accessToken || !profile) {
      console.log(
        `${colour.red}access token and profile not found${colour.reset}`
      );
      return done(null, false, {
        message: "Failed to obtain access token or fetch user profile.",
      });
    }

    console.log(`${colour.red}before try${colour.reset}`);
    try {
      // storing the email in profile into the variable
      const profile_email = profile.emails[0].value;
      console.log(`${colour.red}email:${colour.reset}${profile_email}`);

      // Check if the user already exists in your database
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });

      if (existingUser) {
        // user recored is already saved
        return done(null, existingUser);
      }

      // Save the new user to the database

      const user = await new User({
        googleId: profile.id,
        email: profile_email,
        picture: profile.photos[0].value,
        displayname: profile.displayName,
        firstname: profile.name.givenName,
        middlename: profile.name.middlename,
        lastname: profile.name.familyName,
      }).save;

      // Pass the user object to done callback
      return done(null, user);
    } catch (error) {
      console.log(`${colour.red} inside the catch${colour.reset}`);
      return done(error);
    }
  }
);

module.exports = googleStrategy;
