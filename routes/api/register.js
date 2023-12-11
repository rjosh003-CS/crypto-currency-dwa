const express = require("express");
const router = express.Router();

const validate_register_form = (req, res, next, err) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json(new Error("Missing required fields"));
  }
  next();
};

// POST route for registering a user
router.post("/", validate_register_form, (req, res) => {
  // Assuming req.body contains the user data
  const userData = req.body;

  // Perform any necessary validation or processing of the user data

  const result = {data : { message: "User registered successfully" }};
  console.log(result);
  // Send the user data in JSON format
  res.json(result);
});

module.exports = router;
