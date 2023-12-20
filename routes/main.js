// imports
const colour = require("../color_code");
const router = require("express").Router();
const { isAuthenticated, isNotAuthenticated, forgotPassword, passwordReset}  = require("./helper_function");
const globalErroHandler = require("../mvc/controller/errorController");
const CustomError = require ("../utils/CustomError");

// web routes
const aboutRoute = require("./about");
const homeRoute = require("./home");
const registerRoute = require("./register");
const loginRoute = require("./login");
const contactRoute = require("./contact");
const financeRoute = require("./finance");
const profileRoute = require("./profile");
const dashboardRoute = require("./dashboard");

// api routes
const apiLoginRoute = require("./api/login");
const apiRegisterRoute = require("./api/register");
const apiLogoutRoute = require("./api/logout");
const apiCurrecyRoutes = require ("./api/currency");

// const apiGoogleRegisterRoute = require("./api/registerGoogle");

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

// special routes needs authentication for checking.
router.use("/finance", isAuthenticated, financeRoute);
router.use("/profile", isAuthenticated, profileRoute);
router.use("/dashboard", isAuthenticated, dashboardRoute);

// API Routes
router.use("/register", isNotAuthenticated, registerRoute);
router.use("/login", isNotAuthenticated, loginRoute);

// Routes for success after login
router.get("/success", (req, res) => {
    res.status(200).render("200page",  {message: "Login Successful!"});
});

// Routes for failure after login
router.get("/failure", (req, res) => {
    res.status(401).send( "401page" , {message:"Login Failed!"});
});

// api Routes
router.use("/api", isAuthenticated, apiCurrecyRoutes); 
router.use("/api/login", isNotAuthenticated, apiLoginRoute);
router.use("/api/register", isNotAuthenticated, apiRegisterRoute);
// router.use("/api/register/google", isNotAuthenticated, apiGoogleRegisterRoute);

//  api Routes for logout
router.use("/api/logout", isAuthenticated, apiLogoutRoute);

// password reset routes
router.route("/api/v1/users/forgotPassword").post( forgotPassword);

router.route("/api/v1/users/resetPassword/:token").patch (passwordReset);


// 404 route
router.all("*", (req, res, next)=> {
    const error = new CustomError (`Can't find '${req.originalUrl}' on this server!`, 404 );
    // sending error to global error handler.
    next(error);
  });


// global error handling middleware
router.use( globalErroHandler );


// exports
module.exports = router;