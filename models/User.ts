import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;