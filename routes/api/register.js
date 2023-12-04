const express = require("express");
const router = express.Router();

// POST route for registering a user
router.post("/", (req, res) => {
  // Assuming req.body contains the user data
  const userData = req.body;

  // Perform any necessary validation or processing of the user data

  // Send the user data in JSON format
  res.json(userData);
});

module.exports = router;
