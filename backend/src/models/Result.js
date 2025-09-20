const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: [true, 'Exam ID is required']
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required']
  },
  marksObtained: {
    type: Number,
    required: [true, 'Marks obtained is required'],
    min: [0, 'Marks cannot be negative']
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
    required: [true, 'Grade is required']
  },
  percentage: {
    type: Number,
    min: [0, 'Percentage cannot be negative'],
    max: [100, 'Percentage cannot exceed 100']
  },
  rank: {
    type: Number,
    min: [1, 'Rank must be at least 1']
  },
  remarks: {
    type: String,
    maxlength: [500, 'Remarks cannot exceed 500 characters']
  },
  isAbsent: {
    type: Boolean,
    default: false
  },
  submittedAt: {
    type: Date
  },
  evaluatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Evaluated by is required']
  },
  evaluatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Detailed marking (for subjective exams)
  questionWiseMarks: [{
    questionNumber: Number,
    marksObtained: Number,
    totalMarks: Number,
    remarks: String
  }]
}, {
  timestamps: true
});

// Compound index to prevent duplicate results
resultSchema.index({ examId: 1, studentId: 1 }, { unique: true });

// Index for efficient queries
resultSchema.index({ studentId: 1, 'exam.date': 1 });
resultSchema.index({ examId: 1, grade: 1 });

// Method to calculate grade based on percentage
resultSchema.methods.calculateGrade = function(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 85) return 'A';
  if (percentage >= 80) return 'A-';
  if (percentage >= 75) return 'B+';
  if (percentage >= 70) return 'B';
  if (percentage >= 65) return 'B-';
  if (percentage >= 60) return 'C+';
  if (percentage >= 55) return 'C';
  if (percentage >= 50) return 'C-';
  if (percentage >= 40) return 'D';
  return 'F';
};

module.exports = mongoose.model('Result', resultSchema);