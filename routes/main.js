// imports
const router = require("express").Router();

// web routes
const aboutRoute = require("./about");
const homeRoute = require("./home");
const registerRoute = require("./register");
const loginRoute = require("./login");

// api routes
const apiLoginRoute = require("./api/login");
const apiRegisterRoute = require("./api/register");

// exporting routes
// normal web routes
router.use("/about", aboutRoute);
router.use("/", homeRoute);
router.use("/register", registerRoute);
router.use("/login", loginRoute);

// api Routes
router.use("/api/login", apiLoginRoute);
router.use("/api/register", apiRegisterRoute);

// exports
module.exports = router;
