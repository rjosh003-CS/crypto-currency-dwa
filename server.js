// adding modules
const express = require("express");
const path = require("path");
const env = require("dotenv");
const ejs = require("ejs");
const bodyParser = require("body-parser");

// setting up express
const app = express();

// loading environmental variables
env.config();

// setting up server variables
const port = process.env.port;

//  setting up view engine
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

// starting server
// server listening at port
app.listen(port, () => {
  console.log(`Server listening at port: ${port}...`);
});
