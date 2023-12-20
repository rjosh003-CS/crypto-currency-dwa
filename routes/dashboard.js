const router = require("express").Router();
const { dashboard } = require("../mvc/controller/routeController");

// profile route
router
  .route("/")
  .get(dashboard)
  .post((req, res) => {
    const data = Object.assign(
      {},
      {
        title: "Profile Page",
        currentYear: new Date().getFullYear(),
        user: req.user
      }
    );
    res.status(200).json(data);
  });

module.exports = router;