// Controller for home route
const home = (req, res) => {
  return res.status(200).render("index", 
    {
      title : "Home Page", 
      currentYear : new Date().getFullYear()
    }
  );
};

// Controller for about route
const about = (req, res) => {
  return res.status(200).render("about", {title : "About Page", currentYear: new Date().getFullYear()});
};

// Controller for contact route
const contact = (req, res) => {
  return res.status(200).render("contact", {title : "Contact Page", currentYear: new Date().getFullYear()});
};

// Controller for contact route
const finance = (req, res) => {
  return res.status(200).render("contact", {title : "Finance Page", currentYear: new Date().getFullYear()});
};


// Controller for register route
const register = (req, res) => {
  return res.status(200).render("register",
    {
      title : "Register Page", 
      currentYear : new Date().getFullYear()
    }
  );
};

// Controller for login route
const login = (req, res) => {
  return res.status(200).render("login",
    {
      title : "Login Page", 
      currentYear : new Date().getFullYear()
    }
  );
};
 
 // Exporting all controllers
module.exports = {
  home,
  about,
  register,
  login,
  contact,
  finance
};