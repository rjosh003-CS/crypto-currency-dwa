const router = require("express").Router();
const User = require("../../mvc/models/userSchema");
const { encrypt, compare } = require("../../mvc/controller/helperController");


// Backend route handling the password update
// @route /profile/update-password
router.route("/")
.post(  async (req, res) => {
    const { oldPassword, newPassword, confirmPassword, email } = req.body;

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "New passwords don't match" });
    }

    // Check if the newPassword and oldPassword are not same
    if (newPassword === oldPassword) {
        return res.status(400).json({ message: "New passwords and old password are same" });
    }
    
    // Fetch the user from the database by userId
    User.findBy({email: email}, async (err, user) => {
        if (err || !user) {
            return res.status(500).json({ message: "User not found" });
        }

        // Verify old password
        const isMatch = await compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }

        // Update the password with the new one
        user.password = newPassword;
        user.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to update password" });
            }
            return res.status(200).json({ message: "Password updated successfully" });
        });
    });
});

module.exports = router;
