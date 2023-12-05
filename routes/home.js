const router = require("express").Router();

// importing controllers
const { home } = require("../mvc/controller/main");


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
    return res.status(200).send("home");
  });

module.exports = router ;
