const router = require("express").Router();

// importing controllers
const { register } = require("../mvc/controller/main");

// Register page route
// @route: "/"
router.route("/");

// @method: GET
// @description: get method for register page
  router.get((req, res, next) => {
    // res.render("register", {
    //   title: "Register",
    //   message: "Register page",
    //   name: "Register page"
    // });
    next();
  }, register);

  // @method: POST
  // @description: post method for the register page
  router.post((req, res) => {
    res.send("register page");
  });

// exporitng the router
module.exports = router;
