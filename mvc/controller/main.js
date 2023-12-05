// Controller for home route
const home = (req, res) => {
  return res.send("home");
  // res.render("home");
};

// Controller for about route
const about = (req, res) => {
  return res.send("about");
  // res.render("about");
};

// Controller for register route
const register = (req, res) => {
  return res.send("register");
  // res.render("register");
};

// Controller for login route
const login = (req, res) => {
  return res.send("login");
  // res.render("login");
};
 
 // Exporting all controllers
module.exports = {
  home,
  about,
  register,
  login
};