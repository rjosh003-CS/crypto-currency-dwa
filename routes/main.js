const router = require("express").Router();

// importing controllers
const { home, about, register, login } = require("../mvc/controller/main");


const aboutRoute = require("./about");
const homeRoute = require("./home");
const registerRoute = require("./register");
const loginRoute = require("./login");

/*
// Home page route
router
  .route("/home")
  .get(home, () => {})
  .post(() => {});

// About page route
router
  .route("/about")
  .get(about, () => {})
  .post(() => {});

// Login page route
router
  .route("/login")
  .get(login, () => {})
  .post(() => {});

// Register page route
router
  .route("/register")
  .get(register, () => {})
  .post(() => {});
*/

// exporting routes
router.use("/", aboutRoute);
router.use("/", homeRoute);
router.use("/", registerRoute);
router.use("/", loginRoute)

module.exports = { router };
