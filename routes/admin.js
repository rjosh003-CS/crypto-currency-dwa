const router = require("express").Router();

// admin routes for user profiles
router.route("/:username/admin/:param/")
.get( async (req, res, next) => {
    console.log(req.params.param);
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
          return res.status(404).json({ message: 'User not found' });
        }
    
        // If user found, send the user data in the response
        return res.json(user);
      } catch (err) {
        return res.status(500).json({ message: 'Server Error' });
    }
});

router.route("/:username/admin/:id/profile/")
.get((req, res, next) => {
    console.log(req.params.param);
    next();
});


module.exports = router;