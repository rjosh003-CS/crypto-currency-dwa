// Controller for home route
const home = (req, res) => {
  return res.status(200).send("home");
  // res.render("home");
};

// Controller for about route
const about = (req, res) => {

  return res.status(200).send("about");
  // res.render("about");
};

// Controller for register route
const register = (req, res) => {

  return res.status(200).send("register");
  // res.render("register");
};

// Controller for login route
const login = (req, res) => {

  return res.status(200).send("login");
  // res.render("login");
};
 
 // Exporting all controllers
module.exports = {
  home,
  about,
  register,
  login
};