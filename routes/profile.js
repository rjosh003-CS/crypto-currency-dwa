const router = require("express").Router();
const { isAuthenticated } = require("./helper_function");
const { profile } = require("../mvc/controller/routeController");

// profile route
router
  .route("/")
  .get(isAuthenticated, profile)
  .post(isAuthenticated, (req, res) => {
    const data = Object.assign(
      {},
      {
        title: "Profile Page",
        currentYear: new Date().getFullYear(),
        user: req.user,
      }
    );
    res.status(200).json(data);
  });

module.exports = router;
