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
  const errors = req.errors ? JSON.parse(req.errors) : undefined;
  const newData = Object.assign({}, data, { user: req.user, errors: errors});
  console.log(newData);
  return res.status(200).render("finance", newData);
};

// Controller for profile route
const profile = (req, res) => {
  const data = { title: "Profile Page", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user });
  console.log(newData);
  return res.status(200).render( "profile", newData);
};

// Controller for dashboard route
const dashboard = (req, res) => {
  const data = { title: "Dashboard Page", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user });
  console.log(newData);
  return res.status(200).render( "dashboard", newData);
};

// Controller for register route
const register = (req, res) => {
  const data = {
    title: "Register Page",
    currentYear: new Date().getFullYear()
  };

  // getting message from validation error if any else undefined
  const err = req.flash("validationError");

  let initial_value = {
    firsname: "",
    lastname: "",
    middlename: "",
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  let errors = "";
    try{
      const value = JSON.parse(err);
      initial_value = {
        firstname: value.firstname,
        middlename: value.middlename,
        lastname: value.lastname,
        username: value.username,
        email: value.email,
        password: value.password,
        password2: value.password2
      };

      errors = value.errors;
    }catch(err){}

  console.log("->",initial_value);
  const newData = Object.assign({}, data, {formData : initial_value, errors: errors});
  console.log(newData);
  return res.status(200).render("register", newData);
};

// Controller for login route
const login = (req, res) => {
  const data =  {
    title: "Login Page",
    currentYear: new Date().getFullYear()
  };

  const email = req.session.email || "";

  let initial_value = {
    email : email,
    password: ""
  };
  const error = req.flash("error"); 

  const newData = Object.assign({}, data, {formData: initial_value, errors: error});
  console.log(newData);
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
  profile,
  dashboard
};
