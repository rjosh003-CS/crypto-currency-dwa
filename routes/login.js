const router = require("express").Router();

// importing controllers
const { login } = require("../mvc/controller/routeController");

// Login page route
// @route: "/login"
router
  .route("/")

  // @method: GET
  // @description: get method for login page
  .get((req, res, next) => {
    
    next();
  }, login);

module.exports =  router ;
