const colour = require("./color_code");
const env = require("dotenv");

// loading environmental variables
env.config();

// adding modules
const express = require("express");

// import mongoose
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

//  functions
const database = () => {
  const app = express();

  // setting up server variables from env file
  const mongodb_url = process.env.MONGODB_URL;

  console.log(
    `\n ${colour.blue} mongodb_url: ${colour.yellow} ${mongodb_url} ${colour.reset}\n`
  );

  // Connect to MongoDB using Mongoose
  const db = mongoose.connection;

  db.on('error', (err) => {
     console.error(err);
  });
 
  db.once('open', () => {
     console.log('Connected to MongoDB');
  });

};

const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  collectionName: process.env.SESSION_COLLECTION,
});

module.exports = {
  database,
  store
};
