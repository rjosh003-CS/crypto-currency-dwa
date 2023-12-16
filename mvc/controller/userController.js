// userController.js
const { encrypt, getRandomProfilePic } = require("./helperController");
const User = require("../models/userSchema");
const CustomError = require("../../utils/CustomError");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");

exports.getUsers = asyncErrorHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

exports.getUserById = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
});

exports.updateUser = asyncErrorHandler(async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  res.status(200).json(user);
});

exports.deleteUser = asyncErrorHandler(async (req, res) => {
  await deleteUser(req.params.id);
  res.status(200).json({ message: "User deleted successfully" });
});

exports.findUser = asyncErrorHandler(async (query) => {
  const user = await findUser(query);
  return user;
});

// controller for creating new Users
exports.createUser = asyncErrorHandler(async (req, res, next) => {
  console.log("register started");

  const hashedPassword = await encrypt(req.body.password);
  const user = {
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    picture: getRandomProfilePic(
      req.body.firstname.charAt(0),
      req.body.lastname.charAt(0)
    ),
    password: hashedPassword,
    displayname: req.body.displayname,
  };

  const newUser = new User(user);
  console.log(newUser);
  await newUser.save();

  res.status(201).json({
    status: "success",
    message: "registration successful",
  });
});
