const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required']
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: [true, 'Class ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused'],
    required: [true, 'Attendance status is required']
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Marked by is required']
  },
  subject: {
    type: String
  },
  period: {
    type: Number
  },
  remarks: {
    type: String,
    maxlength: [200, 'Remarks cannot exceed 200 characters']
  },
  markedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate attendance records
attendanceSchema.index({ studentId: 1, date: 1, subject: 1, period: 1 }, { unique: true });

// Index for efficient queries
attendanceSchema.index({ classId: 1, date: 1 });
attendanceSchema.index({ studentId: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);