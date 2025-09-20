const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
};

// Role-based access control
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Check if user owns the resource or has admin access
const ownerOrAdmin = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    if (req.user.role === 'admin' || req.user._id.toString() === resourceUserId) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      });
    }
  };
};

// Check if teacher has access to student/class
const teacherAccess = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      return next();
    }

    if (req.user.role !== 'teacher') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Teacher role required.'
      });
    }

    // Add logic to check if teacher has access to the specific class/student
    // This would depend on your specific business logic
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error in teacher access check'
    });
  }
};

// Check if parent has access to student
const parentAccess = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      return next();
    }

    if (req.user.role !== 'parent') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Parent role required.'
      });
    }

    const studentId = req.params.studentId || req.body.studentId;
    
    if (!req.user.studentIds.includes(studentId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your child\'s data.'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error in parent access check'
    });
  }
};

module.exports = {
  protect,
  authorize,
  ownerOrAdmin,
  teacherAccess,
  parentAccess
};