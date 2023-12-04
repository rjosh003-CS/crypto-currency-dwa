const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  role_verified: {
    type: Boolean,
    default: false,
  },
});

const subscriptionSchema = mongoose.Schema({
  subscribtion_type: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
  subscribtion_start_date: {
    type: Date,
  },
  subscribtion_end_date: {
    type: Date,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: roleSchema,

  subscription: subscriptionSchema,

  profile_pic_url: {
    type: String,
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
  updated_at: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
