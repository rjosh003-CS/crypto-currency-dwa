const router = require("express").Router();

// importing controllers
const { home } = require("../mvc/controller/main");

// Home page route
router
  .route("/")
//   .get(home, () => {})¿
  .get( (req, res, next) => {
             res.render("home", {
            title: "Home",
            message: "Home page",
            name: "Home page",
        })
    })
  .post(() => {});

module.exports = router ;
