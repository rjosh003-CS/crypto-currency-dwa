const router = require("express").Router();

// importing controllers
const { about } = require("../mvc/controller/main");

// About page route
router
  .route("/")
  // @method: GET
  // @route: /about
  // @description: get method for about page
  .get((req, res)=> {
    res.render("about", {
      title: "About",
      message: "About page",
      name: "About page",
    });
  })
  // @method: POST
  // @route:    /about
  // @description: post method for the about page
  .post(() => {});

module.exports = router;
