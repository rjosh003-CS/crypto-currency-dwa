// Assuming you have Express and passport configured
const router = require("express").Router();

// Logout function
const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

// Logout route
router.get("/api/logout", logout);

module.exports = router;