import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyMail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    department: {
      type: String,
    },
    role: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    outlookId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    termsAccepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
