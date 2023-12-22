const router = require("express").Router();
// const User = require("../mvc/models/userSchema");
const axios = require("axios");
const { user_profile_view, admin_search_page } = require("../mvc/controller/routeController");


// @route: /admin/user/:username/profile
router.route("/:username/profile")
.get(  (req, res, next) => {
    const username = req.params.username;
    console.log(username);
    next();
},
user_profile_view
);

// @route: /admin/user/search
router.route("/search")
.get((req, res, next) => {
    console.log("inside the /admin/search");
    next();
},
admin_search_page
);


module.exports = router;