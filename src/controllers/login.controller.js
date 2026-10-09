import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const { empId, password } = req.body;

    // 1. Find user in database
    const user = await User.findOne({ empId });

   if (!user) {
      return res.status(401).json({
        message: 'User not yet registered'
      });
    }
    // 2. Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    // // 3. Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        empId: user.empId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    // 4. Send token
    res.json({
      message: "Login successful",
      token,
      user: user
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to login",
      error: error.message
    });
  }
};


