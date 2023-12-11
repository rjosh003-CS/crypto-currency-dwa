const createApp = require("./app");
const {database, store} = require("./database");

// creating app
const app = createApp(database,store);

// starting server
// server listening at port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening at port: ${port}...`);
});