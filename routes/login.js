const router = require("express").Router();

// importing controllers
const { login } = require("../mvc/controller/main");

// Login page route
// @route: "/login"
router
  .route("/")

  // @method: GET
  // @description: get method for login page
  .get((req, res, next) => {
    // res.render("login", {
    //   title: "Login",
    //   message: "Login page",
    //   name: "Login page"
    // });
    next();
  }, login)

  // @method: POST
  // @description: post method for the login page
  .post((req, res) => {
    console.log(req.baseUrl);
    res.send("login page");
  });

module.exports =  router ;
