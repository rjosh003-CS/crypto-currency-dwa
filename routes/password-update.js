const router = require("express").Router();
const User = require("../mvc/models/userSchema");
const { encrypt, compare } = require("../mvc/controller/helperController");
const { update_password_page } = require("../mvc/controller/routeController");

// Backend route handling the password update
// @route /profile/password-update
router
  .route("/")
  .get(update_password_page)
  .post(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword, email } = req.body;

    const hashedPassword = await encrypt(newPassword);
    console.log("hashedPassword", hashedPassword);
    console.log("newPassword", newPassword);
    
    try {
      // Check if newPassword and confirmPassword match
      if (newPassword !== confirmPassword) {
        const status = "Miss match error";
        const message = "New passwords don't match";

        const data = { status: status, message: message };
        const strData = JSON.stringify([data]);
        console.log(strData);
        req.flash("errors", strData);
        return res.redirect("/profile/password-update");

        // throw new Error(message);
      }

      // Check if the newPassword and oldPassword are the same
      if (newPassword === oldPassword) {
        const status = "No change error";
        const message = "New passwords and old password are the same";

        const data = { status: status, message: message };
        const strData = JSON.stringify([data]);
        console.log(strData);
        req.flash("errors", strData);
        return res.redirect("/profile/password-update");

        // throw new Error(message);
      }

      // Fetch the user from the database by email
      const user = await User.findOne({ email });

      if (!user) {
        const status = "User 404";
        const message = "User not found";

        const data = { status: status, message: message };
        const strData = JSON.stringify([data]);
        console.log(strData);
        req.flash("errors", strData);
        return res.redirect("/profile/password-update");

        // throw new Error(message);
      }

      // Verify old password
      const isMatch = await compare(oldPassword, user.password);

      if (!isMatch) {
        const status = "Wrong password error";
        const message = "Old password is incorrect";

        const data = { status: status, message: message };
        const strData = JSON.stringify([data]);
        console.log(strData);
        req.flash("errors", strData);
        return res.redirect("/profile/password-update");

        // throw new Error(message);
      }

      // Update the password with the new one
      const hashedPassword = await encrypt(newPassword);

      console.log("hashedPassword", hashedPassword);

      const updateResult = await User.updateOne(
        { email: email }, // Criteria to identify the user
        { $set: { password: hashedPassword, updated_at: new Date() } } // Set the new password
      );

      console.log("count:", updateResult.n);
      console.log("ok:", updateResult.ok);

      if (updateResult.acknowledged) {
        console.log("Password updated successfully");
        // Flash success message and redirect to /profile route
        const message = "Password updated successfully";
        req.flash("success", message);
        return res.redirect("/profile");
      } else {
        console.log("Password update failed");
        // Handle failure...
        const status = "fail";
        const message = "Password update failed";
        
        const data = { status: status, message: message };
        const strData = JSON.stringify([data]);
        console.log(strData);
        req.flash("errors", strData);
        return res.redirect("/profile/password-update");
      }
      
      
    } catch (error) {
      console.error(error.message);
      // Flash the error message and redirect back to the profile form
      const status = "Error";
      const message = error.message;

      const data = { status: status, message: message };
      const strData = JSON.stringify([data]);
      console.log(strData);
      req.flash("errors", strData);
      return res.redirect("/profile/password-update");

      // throw new Error(message);
    }
  });

module.exports = router;
