const { body, validationResult } = require("express-validator");


// Middleware for validating the register form
const validate_register_form = [
  // check for valid email
  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("email required!")
    .isEmail()
    .withMessage("Invalid email!"),

  // check for valid password
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password required!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "i")
    .withMessage(
      "Password must contain at least 1 lowercase, 1 uppercase, 1 numeric, and 1 special character"
    ),

  // check for valid username
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username required!")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .isAlphanumeric()
    .withMessage("Username must be alpha numeric"),

  // handling errors
  (req, res, next) => {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
      const processedErrors = {};

      // Iterate through errors and retain only the first error for each field
      errors.array().forEach((error) => {
        if (!processedErrors[error.path]) {
          processedErrors[error.path] = error;
        }
      });

      return res.status(400).json({
        errors: Object.values(processedErrors)
      });
    }
    else{
      res.status(200).json({message: "form validation successful"});
    }
    
    console.log("validation done!");
    next();
  },
];



module.exports = {
  validate_register_form
};