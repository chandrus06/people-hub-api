import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      empId,
      firstName,
      lastName,
      company,
      password,
      confirmPassword,
      email,
      outlookId,
      termsAccepted,
    } = req.body;
    
    if(password !== confirmPassword){
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      empId,
      firstName,
      lastName,
      company,
      confirmPassword: hashedPassword,
      password: hashedPassword,
      email,
      outlookId,
      termsAccepted,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        empId: user.empId,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        email: user.email,
        outlookId: user.outlookId,
        termsAccepted: user.termsAccepted,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
