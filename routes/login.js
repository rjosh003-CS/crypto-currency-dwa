const router = require("express").Router();

// importing controllers
const { login } = require("../mvc/controller/main");

// Login page route
router
  .route("/login")
//   .get(login, () => {})
  .get(()=> {
        res.render("login", {
            title: "Login",
            message: "Login page",
            name: "Login page",
        })
  })
  .post(() => {});

module.exports = { router };
