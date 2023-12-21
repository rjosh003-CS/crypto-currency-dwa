// importing the required module
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// defining the schema for user
const userSchema = new mongoose.Schema({
  displayname: {
    type: String,
  },
  firstname: {
    type: String,
    required: [true, "required field: firstname"],// firstname is a required field
    validate: {
      validator: function (value) {
        // firstname validation logic
        // Example: firstname must be at least 3 characters long and contain only alphabets
        const regex = /^[a-zA-Z]{3,}$/;
        return regex.test(value);
      },
      message: "firstname must be at least 3 characters long and contain only alphabets",
    },
  },
  
  middlename: {
    type: String,
    // required: false, // middlename is an optional field
    validate: {
      validator: function (value) {
        // middlename validation logic
        // Example: middlename must be at least 1 character long and contain only alphabets
        const regex = /^[a-zA-Z]{1,}$/;
        return regex.test(value);
      },
      message: "middlename must be at least 1 character long and contain only alphabets",
    },
  },
  
  lastname: {
    type: String,
    validate: {
      validator: function (value) {
        // lastname validation logic
        // Example: lastname must be at least 3 characters long and contain only alphabets
        const regex = /^[a-zA-Z]{3,}$/;
        return regex.test(value);
      },
      message: "lastname must be at least 3 characters long and contain only alphabets",
    },
  },

  username: {
    type: String,
    required: false, // username is a required field
    unique: true, // username must be unique
  },
  password: {
    type: String,
    required: false, // password is a required field
  },
  email: {
    type: String,
    required: [ true, "required field: email" ], // email is a required field
    unique: true, // email must be unique
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  google_id: {
    type: String,
    unique: true,
    required: false
  },

  picture: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now, // setting the default value for created_at as the current date and time
  },
  updated_at: {
    type: Date,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});



// Define the index on the schema
userSchema.index(
  { google_id: 1 },
  {
    unique: true,
    partialFilterExpression: { google_id: { $type: 'string' } },
  }
);

// pre-save hook for user schema
userSchema.pre("save", async function (next) {
  try {

    // checking for existing email
    const existingUser = await this.model("User").findOne({
      email: this.email,
    });

    if (existingUser) {
      const err = new Error("Email already exists");
      err.name = "ValidationError";
      return next(err);
    }

    // checking for existing username
    const existingUser2 = await this.model("User").findOne({
      username: this.username
    });

    if (existingUser2) {
      const err = new Error("username already exists");
      err.name = "ValidationError";
      return next(err);
    }

    this.updated_at = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.createResetPassword = async function (){
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
}

// adding pagination plugin
userSchema.plugin(mongoosePaginate);

// creating a mongoose model for user with the defined schema
const User = mongoose.model("User", userSchema);

// exporting the model
module.exports = User;