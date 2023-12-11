const createApp = require("./app");
const { connectToDatabase, createSessionStore } = require("./database");

// creating app
const store = createSessionStore();
const app = createApp(store);

// connecting to database
connectToDatabase();

// starting server
// server listening at port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening at port: ${port}...`);
});