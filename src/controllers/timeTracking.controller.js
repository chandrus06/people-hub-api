import TimeTracking from "../models/timeTracking.model.js";

const formatDateTime = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const pad = (n) => (n < 10 ? '0' + n : n);
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = pad(d.getMinutes());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strHours = pad(hours);
  return `${day}-${month}-${year} ${strHours}:${minutes} ${ampm}`;
};

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

    const responseData = {
      ...timeTracking.toObject(),
      punchInTime: formatDateTime(timeTracking.punchInTime),
      punchOutTime: formatDateTime(timeTracking.punchOutTime)
    };

    res.status(201).json({
      message: "Punched in successfully",
      timeTracking: responseData
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

    existingTimeTracking.punchOutTime = Date.now();
    await existingTimeTracking.save();

    const responseData = {
      ...existingTimeTracking.toObject(),
      punchInTime: formatDateTime(existingTimeTracking.punchInTime),
      punchOutTime: formatDateTime(existingTimeTracking.punchOutTime)
    };

    res.status(200).json({
      message: "Punched out successfully",
      timeTracking: responseData
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
