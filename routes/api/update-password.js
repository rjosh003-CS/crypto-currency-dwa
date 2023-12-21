const router = require("express").Router();
const User = require("../../mvc/models/userSchema");
const { encrypt, compare } = require("../../mvc/controller/helperController");

// Backend route handling the password update
// @route /api/profile/update-password
router.route("/").post(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword, email } = req.body;
  console.log("->", req.body);

  // Check if newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New passwords don't match" });
  }

  // Check if the newPassword and oldPassword are not the same
  if (newPassword === oldPassword) {
    return res.status(400).json({ message: "New passwords and old password are the same" });
  }

  try {
    // Fetch the user from the database by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    // Verify old password
    const isMatch = await compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Update the password with the new one
    const hashedPassword = encrypt(newPassword);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update password" });
  }
});

module.exports = router;
