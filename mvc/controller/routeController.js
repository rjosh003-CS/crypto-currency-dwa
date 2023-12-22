const { homePage, aboutPage, contactPage, dashboardPage } = require("./dummy");
const User = require("../models/userSchema");

// Controller for home route
const home = (req, res) => {
  console.log(homePage);

  const data = {
    title: "Home Page",
    currentYear: new Date().getFullYear()
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
  const success = req.flash("success");
  const error = req.flash("error");
  const errors = [ ];

  // try-catch for parsing the json string to json object
  try{
    // check if the error is not undefined or empty string
    if(typeof error !== undefined && error.length > 0) errors = JSON.parse(error);
  }catch(err){ console.log(err)}

  // convert json object to an array of json object
  if (typeof errors === "object" && !Array.isArray(errors)) {
    errors = [errors];
  }

  // creating json object that needs to passed with ejs file to render
  const data = { title: "Profile Page", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user, errors: errors, success: success });

  console.log(newData);

  return res.status(200).render( "profile", newData);
};

// Controller for dashboard route
const dashboard = (req, res) => {
  const data = { title: "Dashboard Page", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user, page: dashboardPage });
  console.log(newData);
  return res.status(200).render( "dashboard", newData);
};

// Controller for dashboard route
const page404 = (req, res) => {
  const data = { title: "404 Page", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user });
  console.log(newData);
  return res.status(200).render( "404page", newData);
};

// Controller for user_provile route
const user_profile_view = async (req, res) => {
  const username = req.params.username;
  console.log(username);

  let user = null;
  const errors = [];
  try {
      user = await User.findOne({ username: username });
      if (!user) {
          errors.push({ state: "fail", message: "User not found!" });
      }
  } catch (err) {
      errors.push({ state: "fail", message: err.message });
  }

  console.log("->", user);

  const data = { title: "User Profile", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user, el: user, errors: errors });
  console.log(newData);

  return res.status(200).render("user_profile", newData);
};


// Controller for dashboard route
const update_password_page = (req, res) => {
  const error = req.flash("errors");
  const success = req.flash("success");
  console.log("->", error);
  let errors = [];

  // try - catch
  try{
    if(typeof error !== undefined && error.length > 0) errors = JSON.parse(error);
  }catch(err){ console.log(err)}

  const data = { title: "Update Password", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user, errors: errors, success: success  });
  console.log(newData);
  return res.status(200).render( "update_password", newData);
};

// Controller for  admin search route
const admin_search_page = (req, res) => {

  const error = req.flash("errors");
  const success = req.flash("success");
  console.log("->", error);
  let errors = [];

  // try - catch 
  try{
    if(typeof error !== undefined && error.length > 0) errors = JSON.parse(error);
  }catch(err){ console.log(err)}

  
  const data = { title: "User Search Page", currentYear: new Date().getFullYear() };
  const newData = Object.assign({}, data, { user: req.user, errors: errors, success: success  });
  console.log(newData);
  return res.status(200).render( "admin_user_search", newData);
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
  dashboard,
  update_password_page,
  page404,
  user_profile_view,
  admin_search_page
};
