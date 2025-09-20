const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exam name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['unit_test', 'mid_term', 'final', 'assignment', 'project', 'quiz'],
    required: [true, 'Exam type is required']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: [true, 'Class ID is required']
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Teacher ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Exam date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required']
  },
  totalMarks: {
    type: Number,
    required: [true, 'Total marks is required'],
    min: [1, 'Total marks must be at least 1']
  },
  passingMarks: {
    type: Number,
    required: [true, 'Passing marks is required']
  },
  instructions: {
    type: String,
    maxlength: [1000, 'Instructions cannot exceed 1000 characters']
  },
  syllabus: [{
    topic: String,
    weightage: Number
  }],
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required']
  },
  term: {
    type: String,
    enum: ['1st', '2nd', '3rd', 'annual'],
    required: [true, 'Term is required']
  }
}, {
  timestamps: true
});

// Index for efficient queries
examSchema.index({ classId: 1, date: 1 });
examSchema.index({ teacherId: 1, date: 1 });
examSchema.index({ subject: 1, academicYear: 1 });

module.exports = mongoose.model('Exam', examSchema);