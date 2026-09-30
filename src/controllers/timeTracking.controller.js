import TimeTracking from "../models/timeTracking.model.js";

export const punchedIn = async (req, res) => {
  try {
    const { empId } = req.body;

    const existingTimeTracking = await TimeTracking.findOne({
      empId,
      punchOutTime: null
    });

    if (existingTimeTracking) {
      return res.status(400).json({
        message: "You have already punched in"
      });
    }

    const timeTracking = await TimeTracking.create({
      empId,
      punchInTime: Date.now()
    });

    res.status(201).json({
      message: "Punched in successfully",
      timeTracking
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const punchedOut = async (req, res) => {
  try {
    const { empId } = req.body;

    const existingTimeTracking = await TimeTracking.findOne({
      empId,
      punchOutTime: null
    });

    if (!existingTimeTracking) {
      return res.status(400).json({
        message: "You have not punched in"
      });
    }

    const timeTracking = await TimeTracking.create({
      ...existingTimeTracking,
      punchOutTime: Date.now()
    });

    res.status(201).json({
      message: "Punched out successfully",
      timeTracking
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
