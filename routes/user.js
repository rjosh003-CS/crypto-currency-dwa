const router = require("express").Router();

// @route: /user/:username/dashboard
router.route("/:username/dashboard")
.get((req, res, next) => {
    console.log(req.params);
    next();
});

// @route: /user/:username/profile
router.route("/:username/profile")
.get((req, res, next) => {
    console.log(req.params);
    next();
});





module.exports = router;