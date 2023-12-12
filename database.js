// database.js

const colour = require("./color_code");

// const env = require("dotenv");
// env.config();

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const connectToDatabase = () => {
  const mongodb_url = process.env.MONGODB_URL;

  console.log(
    `\n ${colour.blue} mongodb_url: ${colour.yellow} ${mongodb_url} ${colour.reset}\n`
  );

  mongoose.connect(mongodb_url);

  const db = mongoose.connection;

  db.on("error", (err) => {
     console.error(err);
  });

  db.once("open", () => {
     console.log("Connected to MongoDB");
  });
};

const createSessionStore = () => {
  return MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    collectionName: process.env.SESSION_COLLECTION
  });
};

module.exports = {
  connectToDatabase,
  createSessionStore
};
