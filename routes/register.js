const router = require("express").Router();

// importing controllers
const { register } = require("../mvc/controller/main");

// Register page route
router
  .route("/")
  //   .get(register, () => {})
  .get((req, res) => {
    res.render("register", {
      title: "Register",
      message: "Register page",
      name: "Register page"
    });
  })
  .post((req, res) => {
    //! todo: write code here
  });

module.exports = router;
