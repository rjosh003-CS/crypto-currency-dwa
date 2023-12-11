// Controller for home route
const home = (req, res) => {
  return res.status(200).render("index", {title : "Home Page", currentYear : new Date().getFullYear()});
  // res.render("home");
};

// Controller for about route
const about = (req, res) => {

  return res.status(200).send("about");
  // res.render("about");
};

// Controller for register route
const register = (req, res) => {

  return res.status(200).render("register", {title : "Register Page", currentYear : new Date().getFullYear()});
  // res.render("register");
};

// Controller for login route
const login = (req, res) => {

  return res.status(200).render("login", {title : "Login Page", currentYear : new Date().getFullYear()});
  // res.render("login");
};
 
 // Exporting all controllers
module.exports = {
  home,
  about,
  register,
  login
};