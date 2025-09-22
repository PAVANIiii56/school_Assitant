const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('role')
    .isIn(['admin', 'teacher', 'parent', 'student'])
    .withMessage('Role must be one of: admin, teacher, parent, student'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  handleValidationErrors
];

const validateUserLogin = [
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('rollNumber')
    .optional()
    .isLength({ min: 1 })
    .withMessage('Please provide a valid roll number'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  // Custom validation to ensure either email or rollNumber is provided
  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.rollNumber) {
      throw new Error('Either email or roll number is required');
    }
    return true;
  }),
  
  handleValidationErrors
];

// Attendance validation
const validateAttendance = [
  body('studentId')
    .isMongoId()
    .withMessage('Valid student ID is required'),
  
  body('date')
    .isISO8601()
    .withMessage('Valid date is required'),
  
  body('status')
    .isIn(['present', 'absent', 'late', 'excused'])
    .withMessage('Status must be one of: present, absent, late, excused'),
  
  body('remarks')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Remarks cannot exceed 200 characters'),
  
  handleValidationErrors
];

// Fee validation
const validateFee = [
  body('studentId')
    .isMongoId()
    .withMessage('Valid student ID is required'),
  
  body('feeType')
    .isIn(['tuition', 'admission', 'exam', 'library', 'transport', 'hostel', 'miscellaneous'])
    .withMessage('Invalid fee type'),
  
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  
  body('dueDate')
    .isISO8601()
    .withMessage('Valid due date is required'),
  
  handleValidationErrors
];

// Exam validation
const validateExam = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Exam name must be between 2 and 100 characters'),
  
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required'),
  
  body('classId')
    .isMongoId()
    .withMessage('Valid class ID is required'),
  
  body('date')
    .isISO8601()
    .withMessage('Valid exam date is required'),
  
  body('totalMarks')
    .isInt({ min: 1 })
    .withMessage('Total marks must be at least 1'),
  
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 minute'),
  
  handleValidationErrors
];

// Result validation
const validateResult = [
  body('examId')
    .isMongoId()
    .withMessage('Valid exam ID is required'),
  
  body('studentId')
    .isMongoId()
    .withMessage('Valid student ID is required'),
  
  body('marksObtained')
    .isFloat({ min: 0 })
    .withMessage('Marks obtained must be a non-negative number'),
  
  body('grade')
    .isIn(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'])
    .withMessage('Invalid grade'),
  
  handleValidationErrors
];

// Message validation
const validateMessage = [
  body('receiverId')
    .isMongoId()
    .withMessage('Valid receiver ID is required'),
  
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message content must be between 1 and 1000 characters'),
  
  body('type')
    .optional()
    .isIn(['text', 'image', 'file', 'audio'])
    .withMessage('Invalid message type'),
  
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateAttendance,
  validateFee,
  validateExam,
  validateResult,
  validateMessage,
  handleValidationErrors
};