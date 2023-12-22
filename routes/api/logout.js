// Assuming you have Express and passport configured
const router = require("express").Router();

// logout route
router.get("/", (req, res) => {
  // Handle normal logout for local strategy
  req.logout((err)=>{
    if (err){ 
      return next(err); 
    }
    // Logout for local strategy
  //  req.session.destroy(); // Destroy the session
  });

  return res.redirect( req.baseUrl  + "/"); // Redirect to home or login page
});


module.exports = router;