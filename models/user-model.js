import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      minlength: [3, "First name must be at least 3 characters long."],
      trim: true,
      validate: {
        validator: function (value) {
          // Ensure the trimmed value is not empty
          return value.trim().length > 0;
        },
        message: "First name cannot be empty or spaces.",
      },
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      minlength: [3, "Last name must be at least 3 characters long."],
      trim: true,
      validate: {
        validator: function (value) {
          return value.trim().length > 0;
        },
        message: "Last name cannot be empty or spaces.",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters long."],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const userModel =
  mongoose.models.Users || mongoose.model("Users", userSchema, "Users");

export default userModel;
