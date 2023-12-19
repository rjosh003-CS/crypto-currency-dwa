const { body, validationResult } = require("express-validator");


// Middleware for validating the register form
const validate_register_form = [
  
  // check for firstname
  body("firstname")
  .trim()
  .notEmpty()
  .withMessage("Name required!")
  .isLength({ min: 3 })
  .withMessage("Firstname must be at least 3 characters long")
  .isAlpha()
  .withMessage("Firstname must be alphabetic"),
  
  // check for middlename
  body("middlename")
  .trim()
  .optional({checkFalsy: true})
  .isLength({ min: 1 })
  .withMessage("Middlename must be at least 1 characters long")
  .isAlpha()
  .withMessage("Middlename must be alphabetic"),
  
  // check for lastname
  body("lastname")
  .trim()
  .optional({ checkFalsy: true})
  .isLength({ min: 3 })
  .withMessage("Lastname must be at least 3 characters long")
  .isAlpha()
  .withMessage("Lastname must be alphabetic"),
  
  // check for valid username
body("username")
  .trim()
  .isLength({ min: 3 })
  .withMessage("Username must be at least 3 characters long")
  .isAlphanumeric()
  .withMessage("Username must be alpha numeric"),
  
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

  // Check for password confirmation
  body("password2")
  .trim()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  })
  .withMessage("Passwords do not match"),

  // handling errors
  (req, res, next) => {
    
    console.log("validat started");
    console.log(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const processedErrors = {};

      // Iterate through errors and retain only the first error for each field
      errors.array().forEach((error) => {
        if (!processedErrors[error.path]) {
          processedErrors[error.path] = error;
        }
      });


      const error = Object.values(processedErrors);
      // console.log(error);

      req.body.errors = error;

        // return res.status(400).json({
        //   errors: Object.values(processedErrors)
        // });
    }
    
    console.log("validation done!");
    next();
  }
];



module.exports = {
  validate_register_form
};