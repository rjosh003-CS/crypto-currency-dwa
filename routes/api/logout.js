// Assuming you have Express and passport configured
const router = require("express").Router();

// Logout route
// router.get("/", (req, res, next)=>{
//   console.log("inside logout route");
//   req.logout((err) => {
    
//     if (err) {
//       return next(err);
//     }
    
//     req.session.destroy(); // Destroy the session
    
//     // Redirect to Google's logout URL
//     const googleLogoutURL = "https://accounts.google.com/logout";
//     // Redirect to Google logout first
//     res.redirect(googleLogoutURL);
    
//     res.redirect("/"); // Redirect after logout
//   });
// });

// logout route
router.get("/", (req, res, next) => {
  const provider = req.provider;

  // Handle normal logout for local strategy
  req.logout((err)=>{
    if (err){ 
      return next(err); 
    }
    // Logout for local strategy
   req.session.destroy(); // Destroy the session
  });

  if (provider === "google") {
    // Redirect to Google's logout URL
    const googleLogoutURL = "https://accounts.google.com/logout";
    res.redirect(googleLogoutURL);
  }

  res.redirect("/"); // Redirect to home or login page
  });

router.get("/google/callback", (req, res) => {
  // Handle normal logout for local strategy
  res.redirect("/"); // Redirect to home or login page
});

module.exports = router;