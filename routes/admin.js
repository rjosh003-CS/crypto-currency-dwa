const router = require("express").Router();

// admin routes for user profiles

// @route: /api/admin/search
router.route("/search")
.get( async (req, res) => {

  const {param} = req.body;

    // try-catch block
    try {
        // Search for the user by name, username, or email
        const user = await User.findOne({
          $or: [
            { name: param },
            { username: param },
            { email: param }
          ]
        });
    
        // If no user found, return 404 error
        if (!user) {
          return res.status(404).json({ error : {status: "error", message: 'User not found'} });
        }
        // If user found, send the user data in the response
        return res.status(200).json(user);
        
    } catch (err) {
      return res.status(500).json({ error : {status: "fail", message: 'Server Error'} });
    }
});



module.exports = router;