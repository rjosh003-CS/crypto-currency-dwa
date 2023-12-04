// Controller for home route
const home = (req, res) => {
  return (req, res) => {
     res.send("home");
     // res.render("home");
  };
 };
 
 // Controller for about route
 const about = (req, res) => {
  return (req, res) => {
     res.send("about");
     // res.render("about");
  };
 };
 
 // Controller for register route
 const register = (req, res) => {
  return (req, res) => {
     res.send("register");
     // res.render("register");
  };
 };
 
 // Controller for login route
 const login = (req, res) => {
  return (req, res) => {
     res.send("login");
     // res.render("login");
  };
 };
 
 // Exporting all controllers
 exports.modules = {
  home,
  about,
  register,
  login
 };