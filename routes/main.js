// imports
const colour = require("../color_code");
const router = require("express").Router();

// web routes
const aboutRoute = require("./about");
const homeRoute = require("./home");
const registerRoute = require("./register");
const loginRoute = require("./login");
const contactRoute = require("./contact");
const financeRoute = require("./finance");

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
router.use("/contact", contactRoute);
router.use("/finance", financeRoute);

// special routes needs authentication for checking.
router.use("/register", registerRoute);
router.use("/login", loginRoute);

// Routes for success and failure after login
router.get("/success", (req, res) => {
    res.status(200).render("200page",  {message: "Login Successful!"});
});

router.get("/failure", (req, res) => {
    res.status(401).send( "401page" , {message:"Login Failed!"});
});


// api Routes
router.use("/api/login", apiLoginRoute);
router.use("/api/register", apiRegisterRoute);

// exports
module.exports = router;