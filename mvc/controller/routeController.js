const { homePage, aboutPage, contactPage } = require("./dummy");

// Controller for home route
const home = (req, res) => {
  console.log(homePage);

  const data = {
    title: "Home Page",
    currentYear: new Date().getFullYear(),
  };

  const newData = Object.assign({}, data, { user: req.user, page: homePage });

  console.log(newData);

  return res.status(200).render("index", newData);
};

// Controller for about route
const about = (req, res) => {
  const data = { title: "About Page", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user, page: aboutPage });
  console.log(newData);
  return res.status(200).render("about", newData);
};

// Controller for contact route
const contact = (req, res) => {
  const data = { title: "Contact Page", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, {
    user: req.user,
    page: contactPage
  });
  console.log(newData);
  return res.status(200).render("contact", newData);
};

// Controller for contact route
const finance = (req, res) => {
  const data = { title: "Finance Page", currentYear: new Date().getFullYear() };
  const error = req.error ? JSON.parse(req.error) : undefined;
  const newData = Object.assign({}, data, { user: req.user, error: error});
  console.log(newData);
  return res.status(200).render("finance", newData);
};

// Controller for contact route
const profile = (req, res) => {
  const data = { title: "Profile Page", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user });
  console.log(newData);
  return res.status(200).render( "profile", newData);
};

// Controller for register route
const register = (req, res) => {
  const data = {
    title: "Register Page",
    currentYear: new Date().getFullYear(),
  };
  const error = req.error ? JSON.parse(req.error) : undefined;
  const newData = Object.assign({}, data, { error: error });
  return res.status(200).render("register", newData);
};

// Controller for login route
const login = (req, res) => {
  const data =  {
    title: "Login Page",
    currentYear: new Date().getFullYear()
  };
  const error = req.error ? JSON.parse(req.error) : undefined;
  const newData = Object.assign({}, data, {error: error});
  return res.status(200).render("login", newData);
};

// Exporting all controllers
module.exports = {
  home,
  about,
  register,
  login,
  contact,
  finance,
  profile
};
