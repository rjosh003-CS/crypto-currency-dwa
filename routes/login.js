const router = require("express").Router();

// importing controllers
const { login } = require("../mvc/controller/main");

// Login page route
router
  .route("/")
  //   .get(login, () => {})
  .get((req, res) => {
    res.render("login", {
      title: "Login",
      message: "Login page",
      name: "Login page"
    });
  })
  .post(() => {});

module.exports =  router ;
