const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'success', 'error', 'reminder'],
    required: [true, 'Type is required']
  },
  category: {
    type: String,
    enum: ['attendance', 'fees', 'exam', 'result', 'announcement', 'system', 'ai_insight'],
    required: [true, 'Category is required']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  
  // Related data
  relatedId: {
    type: mongoose.Schema.Types.ObjectId
  },
  relatedModel: {
    type: String,
    enum: ['Attendance', 'Fee', 'Exam', 'Result', 'AIInsight', 'User', 'Class']
  },
  
  // Delivery channels
  channels: {
    push: { type: Boolean, default: true },
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false }
  },
  
  // Delivery status
  deliveryStatus: {
    push: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      error: String
    },
    email: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      error: String
    },
    sms: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      error: String
    }
  },
  
  // Action buttons (for interactive notifications)
  actions: [{
    label: String,
    action: String,
    url: String
  }],
  
  // Scheduled delivery
  scheduledFor: {
    type: Date
  },
  
  // Auto-expire
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, read: 1 });
notificationSchema.index({ type: 1, category: 1 });
notificationSchema.index({ scheduledFor: 1 });

// TTL index for expired notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Notification', notificationSchema);