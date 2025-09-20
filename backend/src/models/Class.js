const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true
  },
  grade: {
    type: String,
    required: [true, 'Grade is required']
  },
  section: {
    type: String,
    required: [true, 'Section is required']
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Class teacher is required']
  },
  subjects: [{
    name: String,
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  academicYear: {
    type: String,
    required: [true, 'Academic year is required']
  },
  maxStudents: {
    type: Number,
    default: 40
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for student count
classSchema.virtual('studentCount').get(function() {
  return this.students.length;
});

module.exports = mongoose.model('Class', classSchema);