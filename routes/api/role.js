const router = require("express").Router();
const User = require("../../mvc/models/userSchema");

// @routes: /api/role
router.route("/roles")
    .get( async (req, res) => {
        try {
            const enumValues = User.schema.path('role').enumValues;
            res.json({ enumValues });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    });

module.exports = router;
