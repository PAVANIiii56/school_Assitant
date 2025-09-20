const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required']
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required']
  },
  feeType: {
    type: String,
    enum: ['tuition', 'admission', 'exam', 'library', 'transport', 'hostel', 'miscellaneous'],
    required: [true, 'Fee type is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'partial'],
    default: 'pending'
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: [0, 'Paid amount cannot be negative']
  },
  paidDate: {
    type: Date
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank_transfer', 'online', 'cheque']
  },
  transactionId: {
    type: String
  },
  receiptNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  discount: {
    amount: { type: Number, default: 0 },
    reason: String,
    appliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  lateFee: {
    type: Number,
    default: 0
  },
  remarks: {
    type: String,
    maxlength: [500, 'Remarks cannot exceed 500 characters']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by is required']
  }
}, {
  timestamps: true
});

// Index for efficient queries
feeSchema.index({ studentId: 1, academicYear: 1 });
feeSchema.index({ status: 1, dueDate: 1 });

// Virtual for remaining amount
feeSchema.virtual('remainingAmount').get(function() {
  return this.amount - this.paidAmount;
});

// Method to check if fee is overdue
feeSchema.methods.isOverdue = function() {
  return this.status !== 'paid' && new Date() > this.dueDate;
};

module.exports = mongoose.model('Fee', feeSchema);