const router = require("express").Router();
const User = require("../mvc/models/userSchema"); // Update with your actual model

// API route for auto-completion
// @route: /admin/api/v1/autocomplete
router.get("/autocomplete", async (req, res) => {
  const { param } = req.query;

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: param, $options: "i" } },
        { username: { $regex: param, $options: "i" } },
        { email: { $regex: param, $options: "i" } },
      ],
    }).limit(10);

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
});

// API route for fetching paginated search results
// @route: /admin/api/v1/search
router.get("/search", async (req, res) => {
  const { param, page = 1, limit = 10 } = req.query;

  try {
    const regexParam = new RegExp(param, "i");
    const query = {
      $or: [
        { name: { $regex: regexParam } },
        { username: { $regex: regexParam } },
        { email: { $regex: regexParam } },
      ],
    };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const users = await User.paginate(query, options);

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
});

module.exports = router;
