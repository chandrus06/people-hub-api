import User from "../models/user.model.js";

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      empId: req.body.empId,
      password: req.body.password
    });

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    res.status(200).json({
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to login',
      error: error.message
    });
  }
};
