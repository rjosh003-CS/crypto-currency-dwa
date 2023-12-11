const router = require("express").Router();

// importing controllers
const { register } = require("../mvc/controller/main_controller");

// Register page route
// @route: "/register"
router
  .route("/")

  // @method: GET
  // @description: get method for register page
  .get(register);

// exporitng the router
module.exports = router;
