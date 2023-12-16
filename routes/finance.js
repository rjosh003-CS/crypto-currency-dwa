const router = require("express").Router();

// importing controllers
const { finance } = require("../mvc/controller/routeController");

// About page route

// @route: "/about"
router
  .route("/")

  // @method: GET
  // @description: get method for about page
  .get((req, res, next) => {
    // console.log(req.url);

    next();
  }, finance)

  // @method: POST
  // @description: post method for the about page
  .post((req, res) => {
    // console.log(req.baseUrl);
    return res.status(200).send("Finance page");
  });

module.exports = router;
