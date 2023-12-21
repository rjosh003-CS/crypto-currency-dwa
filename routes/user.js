const router = require("express").Router();
// const User = require("../mvc/models/userSchema");
const axios = require("axios");
const { user_profile_view } = require("../mvc/controller/routeController");

// @route: /admin/user/
router.route("/")
.get((req, res, next) => {
    console.log("inside the /user route");
    next();
});

// @route: /admin/user/:username/profile
router.route("/:username/profile")
.get(  (req, res, next) => {
    const username = req.params.username;
    console.log(username);
    next();
},
user_profile_view
);


module.exports = router;