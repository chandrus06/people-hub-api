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
      employeeId,
      firstName,
      lastName,
      company,
      companyName,
      role,
      phone,
      department,
      address,
      password,
      confirmPassword,
      email,
      companyMail,
      profileImage,
      outlookId,
      termsAccepted,
    } = req.body;
    
    // Map fields to support both sign-up and user-create forms
    const finalEmpId = empId || employeeId;
    const finalCompany = company || companyName;

    let finalPassword = password;
    if (!password) {
      // Default password if not provided (e.g. from admin user-create)
      finalPassword = "Welcome@123";
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(finalPassword, 10);
    const userData = {
      empId: finalEmpId,
      firstName,
      lastName,
      company: finalCompany,
      confirmPassword: hashedPassword,
      password: hashedPassword,
      email,
      termsAccepted,
      role,
      phone,
      department,
      address,
      companyMail,
      profileImage,
    };

    if (outlookId) {
      userData.outlookId = outlookId;
    }

    const user = await User.create(userData);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        empId: user.empId,
        employeeId: user.empId,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        companyName: user.company,
        email: user.email,
        companyMail: user.companyMail,
        department: user.department,
        role: user.role,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage,
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
