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
const flash = require("express-flash");
const cors = require("cors");

// importing express
const express = require("express");

// session related imports
const session = require("express-session");

const createApp = (sessionStore) => {
  // setting up express
  const app = express();
  
  // Set up static files
  app.use("/public", express.static(path.join(__dirname, "/public")));
  
  // defining the view folder path
  app.set("views", path.join(__dirname, "/mvc/view"));
  
  // Setup express-session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET, // Change this to a random secret key
      resave: false,
      saveUninitialized: false,
      store: sessionStore, // Use the MongoDB store for sessions
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Session expiration (optional)
      }
    })
    );
    
    // Use express.urlencoded() for parsing URL-encoded data

    // app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(express.json());
    
    // import the passport module
    const passport = require("./mvc/service/passport/passport_main.js");
    
    app.use(flash());

    // Passport initialization middleware
    app.use(passport.initialize());
    app.use(passport.session());
    
    // setting up view engine
    app.set("view engine", "ejs");

    const corsOptions = {
      origin: ["https://api.coingecko.com/api/v3/coins/list"], // Allow requests from this origin
      methods: "GET,POST" // Allow specific HTTP methods
    };

    app.use(cors(corsOptions));

  // importing routes
  const mainRoutes = require("./routes/main"); // updated import statement
  // using the routes in our application
  app.use("/", mainRoutes);


  return app;
};

module.exports = createApp;