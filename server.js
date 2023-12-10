const app = require("./app");

// starting server
// server listening at port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening at port: ${port}...`);
});
