/* inside the .env file

#-----------------begin------------------------

PORT = 8000

#  Google api
CLIENT_ID = <YOUR CLIENT_ID>
CLIENT_SECRET = <YOUR CLIENT_SECRET>
CALL_BACK_URL = <YOUR_CALLBACK_URL>

# mongodb URL
MONGODB_URL = <mongodb_url>

#-----------------end of file--------------------

*/

// adding modules
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");

// importing express
const express = require("express");

// session related imports
const session = require("express-session");

const createApp = (sessionStore) => {
  // setting up express
  const app = express();

  // Setup express-session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET, // Change this to a random secret key
      resave: false,
      saveUninitialized: true,
      store: sessionStore, // Use the MongoDB store for sessions
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Session expiration (optional)
      },
    })
  );

  // setting up view engine
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "/mvc/view"));

  // Use express.urlencoded() for parsing URL-encoded data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // import the passport module
  const passport = require("./mvc/service/passport/passport_main.js");

  // Passport initialization middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Set up static files
  //todo!
  // app.use(express.static(path.join(__dirname, "/mvc/view")));
  app.use(express.static(path.join(__dirname, "/public")));

  // importing routes
  const mainRoutes = require("./routes/main"); // updated import statement
  // using the routes in our application
  app.use("/", mainRoutes);


  return app;
};

module.exports = createApp;