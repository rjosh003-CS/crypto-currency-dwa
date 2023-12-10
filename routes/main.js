// imports
const colour = require("../color_code");
const router = require("express").Router();

// web routes
const aboutRoute = require("./about");
const homeRoute = require("./home");
const registerRoute = require("./register");
const loginRoute = require("./login");

// api routes
const apiLoginRoute = require("./api/login");
const apiRegisterRoute = require("./api/register");

// Middleware for logging requests
router.use((req, res, next) => {
    console.log(`${colour.blue}@method: ${colour.yellow}${req.method} \t ${colour.blue}@url: ${colour.yellow}${ req.originalUrl} ${colour.reset}`);
    next();
});

// exporting routes
// normal web routes
router.use("/", homeRoute);
router.use("/about", aboutRoute);
router.use("/register", registerRoute);
router.use("/login", loginRoute);

// api Routes
router.use("/api/login", apiLoginRoute);
router.use("/api/register", apiRegisterRoute);

// exports
module.exports = router;
