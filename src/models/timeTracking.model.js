import mongoose from 'mongoose';

const timeTrackingSchema = new mongoose.Schema(
    {
        empId: {
            type: String,
            required: true
        },
        punchInTime: {
            type: Date,
            required: false,
            default: Date.now
        },
        punchOutTime: {
            type: Date,
            required: false,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('TimeTracking', timeTrackingSchema);
