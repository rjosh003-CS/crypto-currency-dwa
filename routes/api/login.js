
const express = require('express');
const router = express.Router();

// POST route for login
router.post('/', (req, res) => {
  // Assuming you have a user object with username and password properties
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  // Assuming you have a database or authentication logic here
  // You can perform any necessary checks or validations

  // Sending the response in JSON format
  res.json({ message: 'Login successful', user });
});

module.exports = router;
