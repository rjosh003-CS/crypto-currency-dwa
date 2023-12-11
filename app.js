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

const createApp = (database, store) => {
  // setting up express
  const app = express();

  database();

  // Setup express-session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET, // Change this to a random secret key
      resave: false,
      saveUninitialized: true,
      store: store, // Use the MongoDB store for sessions
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Session expiration (optional)
      },
    })
  );

  // import the passport module
  const passport = require("./mvc/service/passport/passport_main");

  // Passport initialization middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // setting up view engine
  app.set("view engine", "ejs");

  // middleware to parse body of request into json object
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // Set up static files
  app.use(express.static(path.join(__dirname, "/mvc/view")));

  // importing routes
  const mainRoutes = require("./routes/main"); // updated import statement
  // using the routes in our application
  app.use("/", mainRoutes);

  return app;
};

module.exports = createApp;