const router = require("express").Router();

// importing controllers
const { home } = require("../mvc/controller/routeController");

// Home page route
router
  .route("/")
  .get((req, res, next) => {
    // res.render("home", {
    //   title: "Home",
    //   message: "Home page",
    //   name: "Home page",
    // });
    next();
  }, home)
  .post((req, res) => {
    return res.status(200).send("home page");
  });

module.exports = router ;
