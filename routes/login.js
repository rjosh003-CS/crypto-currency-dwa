const router = require("express").Router();

// importing controllers
const { login } = require("../mvc/controller/main");

// Login page route
router.route("/");

router.get((req, res, next) => {
  // res.render("login", {
  //   title: "Login",
  //   message: "Login page",
  //   name: "Login page"
  // });
  next();
}, login);

router.post((req, res) => {
  res.send("login page");
});

module.exports =  router ;
