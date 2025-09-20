const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender ID is required']
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Receiver ID is required']
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'audio'],
    default: 'text'
  },
  
  // File attachments
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String
  }],
  
  // Message status
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  
  // Read status
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  
  // Thread/conversation grouping
  threadId: {
    type: String,
    required: [true, 'Thread ID is required']
  },
  
  // Reply to another message
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  
  // Message reactions
  reactions: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    emoji: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Message priority
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  
  // Auto-delete
  expiresAt: {
    type: Date
  },
  
  // Message editing
  edited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date
  },
  originalContent: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
messageSchema.index({ threadId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1, receiverId: 1 });
messageSchema.index({ receiverId: 1, read: 1 });

// TTL index for auto-delete messages
messageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to generate thread ID
messageSchema.statics.generateThreadId = function(userId1, userId2) {
  const sortedIds = [userId1, userId2].sort();
  return `${sortedIds[0]}_${sortedIds[1]}`;
};

module.exports = mongoose.model('Message', messageSchema);