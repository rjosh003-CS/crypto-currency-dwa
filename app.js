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
const colour = require("./color_code");
const ejs = require("ejs");
const path = require("path");
const env = require("dotenv");
const bodyParser = require("body-parser");

// importing express
const express = require("express");

// session related imports
const session = require("express-session");
const MongoStore = require("connect-mongo");

// import mongoose
const mongoose = require("mongoose");

// import the passport module
const passport = require("./mvc/service/passport/passport_main");

// loading environmental variables
env.config();

// setting up server variables from env file
const mongodb_url = process.env.MONGODB_URL;

console.log(
  `\n ${colour.blue} mongodb_url: ${colour.yellow} ${mongodb_url} ${colour.reset}\n`
);

// setting up express
const app = express();

// Connect to MongoDB using Mongoose
const connect =  async () => {
    try{
        await mongoose.connect(mongodb_url);
        console.log("connected to mongodb...");
    }
    catch(err){
        console.log(err);
    }
}

connect();

// Setup express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Change this to a random secret key
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: process.env.SESSION_COLLECTION,
    }), // Use the MongoDB store for sessions
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Session expiration (optional)
    },
  })
);

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

module.exports = app;
