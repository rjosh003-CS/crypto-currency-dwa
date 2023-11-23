const router = require("express").Router();

// importing controllers
const { register } = require("../mvc/controller/main");

// Register page route
router
  .route("/")
  //   .get(register, () => {})
  .get(() => {
    res.render("register", {
      title: "Register",
      message: "Register page",
      name: "Register page",
    });
  })
  .post(() => {});

module.exports = router;
