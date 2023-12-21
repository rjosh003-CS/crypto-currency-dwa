const router = require("express").Router();
const { profile } = require("../mvc/controller/routeController");

// @route: /profile 
router
  .route("/")
  .get(profile)
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

// @route: /profile/edit
router
.route("/edit")
.post((req, res) => {
  console.log(req.body);
  // todo!
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
