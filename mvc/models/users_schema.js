// importing the required module
const mongoose = require("mongoose");

// defining the schema for role
const roleSchema = new mongoose.Schema({
 role: {
    type: String,
    enum: ["user", "admin"], // enumeration of valid values for role
    default: "user", // default value for role
 },
 role_verified: {
    type: Boolean,
    default: false, // default value for role_verified
 },
});

// defining the schema for subscription
const subscriptionSchema = mongoose.Schema({
 subscribtion_type: {
    type: String,
    enum: ["free", "premium"], // enumeration of valid values for subscribtion_type
    default: "free", // default value for subscribtion_type
 },
 subscribtion_start_date: {
    type: Date,
 },
 subscribtion_end_date: {
    type: Date,
 },
});

// defining the schema for user
const userSchema = new mongoose.Schema({
 username: {
    type: String,
    required: true, // username is a required field
    unique: true, // username must be unique
 },
 password: {
    type: String,
    required: true, // password is a required field
 },
 email: {
    type: String,
    required: true, // email is a required field
    unique: true, // email must be unique
 },

 role: roleSchema, // defining the role schema within the user schema

 subscription: subscriptionSchema, // defining the subscription schema within the user schema

 profile_pic_url: {
    type: String,
 },
 created_at: {
    type: Date,
    default: () => Date.now(), // setting the default value for created_at as the current date and time
 },
 updated_at: {
    type: Date,
 },
});

// creating a mongoose model for user with the defined schema
const User = mongoose.model("User", userSchema);

// exporting the user model for use in other modules
module.exports = User;