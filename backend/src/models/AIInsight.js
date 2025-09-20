const mongoose = require('mongoose');

const aiInsightSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required']
  },
  type: {
    type: String,
    enum: ['performance', 'attendance', 'behavior', 'recommendation', 'prediction', 'alert'],
    required: [true, 'Insight type is required']
  },
  category: {
    type: String,
    enum: ['academic', 'behavioral', 'social', 'health', 'career'],
    required: [true, 'Category is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: [true, 'Priority is required']
  },
  confidence: {
    type: Number,
    min: [0, 'Confidence cannot be negative'],
    max: [100, 'Confidence cannot exceed 100'],
    required: [true, 'Confidence score is required']
  },
  
  // Subject-specific insights
  subject: {
    type: String
  },
  
  // Data used for generating insight
  dataPoints: [{
    metric: String,
    value: mongoose.Schema.Types.Mixed,
    date: Date
  }],
  
  // AI recommendations
  recommendations: [{
    action: String,
    description: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    estimatedImpact: String,
    resources: [String]
  }],
  
  // Predicted outcomes
  predictions: [{
    metric: String,
    currentValue: Number,
    predictedValue: Number,
    timeframe: String,
    confidence: Number
  }],
  
  // Status tracking
  status: {
    type: String,
    enum: ['new', 'acknowledged', 'in_progress', 'resolved', 'dismissed'],
    default: 'new'
  },
  
  // Who has seen this insight
  viewedBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    viewedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Actions taken based on this insight
  actions: [{
    description: String,
    takenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    takenAt: {
      type: Date,
      default: Date.now
    },
    result: String
  }],
  
  // Expiry date for time-sensitive insights
  expiresAt: {
    type: Date
  },
  
  // AI model information
  aiModel: {
    name: String,
    version: String,
    parameters: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for efficient queries
aiInsightSchema.index({ studentId: 1, createdAt: -1 });
aiInsightSchema.index({ type: 1, priority: 1 });
aiInsightSchema.index({ status: 1, expiresAt: 1 });

// TTL index for expired insights
aiInsightSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('AIInsight', aiInsightSchema);