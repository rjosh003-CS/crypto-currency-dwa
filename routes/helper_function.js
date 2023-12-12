exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("directed to auth protected pages");
    return next();
  }
  res.redirect("./");
};

exports.isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("directed to login");
    return next();
  }
  res.redirect("./");
};
