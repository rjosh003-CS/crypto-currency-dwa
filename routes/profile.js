const router = require("express").Router();
const { profile } = require("../mvc/controller/routeController");
const User = require("../mvc/models/userSchema");

// @route: /profile 
router
  .route("/")
  .get(profile)
  .post((req, res) => {
    const data = Object.assign(
      {},
      {
        title: "Profile Page",
        currentYear: new Date().getFullYear(),
        user: req.user
      }
    );
    res.status(200).json(data);
  });


// @route: /profile/edit
router.route("/edit").post(async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const newEmail = req.body.email; // Assuming the new email to be updated

    // Check if the new email is different from the current user's email
    if (newEmail !== userEmail) {
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {

        const status = "Email not available";
        const message = "Email already exists for another user"

        const data = {
          status: error,
          message: message
        }
        const newData = JSON.stringify(data);
        console.log(newData);
        req.flash("errors", newData)
        return;
        // return res.status(400).json({ error: 'Email already exists for another user.' });
      }
    }

    // Filter out empty or undefined fields from the request body
    const updatedData = Object.fromEntries(
      Object.entries(req.body).filter(([key, value]) => value !== undefined && value !== '')
    );

    delete updatedData.userEmail;

    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $set: updatedData },
      { new: true }
    );

    const message = "Profile updated successfully";
    req.flash("success", message);

    return res.redirect( req.baseUrl  + "/profile");
    // res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);

    const status = "Fail";
    const message = "Internal Server Error"

    const data = {
      status: error,
      message: message
    }
    const newData = JSON.stringify(data);
    console.log(newData);
    req.flash("errors", newData)
    return;
    // res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;
