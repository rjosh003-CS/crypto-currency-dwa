const router = require("express").Router();

// importing controllers
const { about } = require("../mvc/controller/main");

// About page route

// @route: /about
router.route("/");

// @method: GET
// @description: get method for about page
router.get((req, res, next) => {
  console.log(req.url);
  // res.render("about", {
  //   title: "About",
  //   message: "About page",
  //   name: "About page"
  // });
}, about);

  // @method: POST
  // @description: post method for the about page
router.post((req, res) => {
  return res.status(200).send("about page");
});

module.exports = router;
