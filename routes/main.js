const router = require("express").Router();

const aboutRoute = require("./about");
const homeRoute = require("./home");
const registerRoute = require("./register");
const loginRoute = require("./login");

// exporting routes
router.use("/about", aboutRoute);
router.use("/", homeRoute);
router.use("/register", registerRoute);
router.use("/login", loginRoute);

module.exports = router;
