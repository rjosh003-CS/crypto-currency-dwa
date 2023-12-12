const validate = {
    email: (email) => {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return email.match(regex) !== null; // Use !== null to check if it matches
    },
  
    password: (password, min_length) => {
      return (
        password.length >= min_length &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)
      );
    }
  };
  
  // Middleware for validating the register form
  const validate_register_form = (req, res, next, err) => {
    const { username, password, email } = req.body;
  
    console.log("validation start");
  
    // check for required fields
    if (!username || !password || !email) {
      return res.status(400).json(new Error("Missing required fields"));
    }
    // check for valid email 
    if (!validate.email()) {
      return res.status(400).json(new Error("Invalid email format"));
    }
  
    // check password contain Capital and special characters and length atleast 8 characters.
    if (validate.password(password, 8)) {
      return res.status(400).json(
        new Error(
          "Password must contain at least one Capital letter, one small letter, one number and one special character"
        )
      );
    }
    console.log("validation done!");
    next();
  };

    module.exports = {
        validate_register_form,
        validate
    };