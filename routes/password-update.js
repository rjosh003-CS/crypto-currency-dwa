const router = require("express").Router();
const axios = require("axios");
const { update_password_page } = require("../mvc/controller/routeController");

// @route: /profile/update-password
// POST route to handle password update from the profile form
router.route("/")
.get(update_password_page)
.post (async (req, res) => {
    const { oldPassword, newPassword, confirmPassword, email } = req.body;

    try {
        // Send a request to your backend API route for updating the password
        const response = await axios.post('/api/profile/update-password', {
            oldPassword,
            newPassword,
            confirmPassword,
            email
        });

        // Handle success response from the backend
        // Flash success message and redirect to /profile route
        req.flash('success', 'Password updated successfully');
        res.redirect('/profile');
    } catch (error) {
        // Handle errors received from the backend
        const errorMessage = error.response.data.message;
        // Flash the error message and redirect back to the profile form
        req.flash('error', errorMessage);
        res.redirect('/profile/update-password');
    }
});

module.exports = router