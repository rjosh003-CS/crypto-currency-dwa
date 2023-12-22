const router = require("express").Router();
const User = require("../../mvc/models/userSchema"); // Update with your actual model

// API route for auto-completion
// @route: /api/v1/admin/autocomplete?term=${searchTerm}
router.get("/autocomplete", async (req, res) => {
  const { term } = req.query;
  console.log(term);
  
  try {
    const users = await User.find({
      $or: [
        { displayname: { $regex: term, $options: "i" } },
        { username: { $regex: term, $options: "i" } },
        { email: { $regex: term, $options: "i" } },
      ],
    }).limit(10);
    
    console.log(users);
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
});

// API route for fetching paginated search results
//  @route: /api/v1/admin/search?param=query&page=${pageNumber}
router.get("/search", async (req, res) => {
  const { param, page = 1, limit = 10 } = req.query;
  console.log(param);

  try {
    const regexParam = new RegExp(param, "i");
    const query = {
      $or: [
        { displayname: { $regex: regexParam } },
        { username: { $regex: regexParam } },
        { email: { $regex: regexParam } },
      ],
    };
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    
    const users = await User.paginate(query, options);
    
    console.log(users.docs.length);
    // Returning only relevant user accounts that match the search query
    return res.json(users); // Assuming 'docs' contains the array of user accounts
  } catch (err) {
    return res.status(500).json({ status: "fail", message: "Server Error" });
  }
});


module.exports = router;

// @route: /admin/api/v1/autocomplete
// @route: /admin/api/v1/search