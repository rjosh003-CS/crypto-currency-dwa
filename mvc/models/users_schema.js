const mongoose = require("mongoose");

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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  role_verified: {
    type: Boolean,
    default: false,
  },
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
