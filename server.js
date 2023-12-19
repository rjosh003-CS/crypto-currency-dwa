const dotenv = require("dotenv");
const { parsed: envVars } = dotenv.config();
const dotenvExpand = require("dotenv-expand");

dotenvExpand.expand({ parsed: envVars });


const createApp = require("./app");
const { connectToDatabase, createSessionStore } = require("./database");

// creating app
const store = createSessionStore();
const app = createApp(store);

// connecting to database
connectToDatabase();

// starting server
const port = process.env.PORT || 5000;

// server listening at port
const server = app.listen(port, () => {
  console.log(`Server listening at port: ${port}...`);
});

// handling unhandled promise rejections
process.on("unhandledRejection", (err)=>{
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(()=>{
    process.exit(1);
  });
});

// handling uncaught exceptions
process.on("uncaughtException", (err)=>{
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  server.close(()=>{
    process.exit(1);
  });
});