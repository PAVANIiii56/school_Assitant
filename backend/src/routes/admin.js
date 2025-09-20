const express = require('express');
const {
  getDashboardStats,
  getRecentActivities,
  getAIAlerts,
  getClassPerformance
} = require('../controllers/admin/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/activities', getRecentActivities);
router.get('/dashboard/ai-alerts', getAIAlerts);
router.get('/dashboard/class-performance', getClassPerformance);

module.exports = router;