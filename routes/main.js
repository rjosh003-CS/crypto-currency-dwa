const router = require("express").Router();

// importing controllers
const { home, about, register, login } = require("../mvc/controller/main");

const aboutRoute = require("./about");
const homeRoute = require("./home");
const registerRoute = require("./register");
const loginRoute = require("./login");

// exporting routes
router.use("/about", aboutRoute);
router.use("/", homeRoute);
router.use("/register", registerRoute);
router.use("/login", loginRoute);

module.exports =  router;
