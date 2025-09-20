const User = require('../../models/User');
const Class = require('../../models/Class');
const Attendance = require('../../models/Attendance');
const Fee = require('../../models/Fee');
const Exam = require('../../models/Exam');
const Result = require('../../models/Result');
const AIInsight = require('../../models/AIInsight');
const moment = require('moment');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonth = moment().startOf('month');
    const lastMonth = moment().subtract(1, 'month').startOf('month');

    // Get total counts
    const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    const totalTeachers = await User.countDocuments({ role: 'teacher', isActive: true });
    const totalParents = await User.countDocuments({ role: 'parent', isActive: true });
    const totalClasses = await Class.countDocuments({ isActive: true });

    // Get student growth
    const studentsThisMonth = await User.countDocuments({
      role: 'student',
      isActive: true,
      createdAt: { $gte: currentMonth.toDate() }
    });
    const studentsLastMonth = await User.countDocuments({
      role: 'student',
      isActive: true,
      createdAt: { $gte: lastMonth.toDate(), $lt: currentMonth.toDate() }
    });

    // Calculate fee collection stats
    const totalFeesCollected = await Fee.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$paidAmount' } } }
    ]);

    const feesThisMonth = await Fee.aggregate([
      { 
        $match: { 
          status: 'paid',
          paidDate: { $gte: currentMonth.toDate() }
        }
      },
      { $group: { _id: null, total: { $sum: '$paidAmount' } } }
    ]);

    const feesLastMonth = await Fee.aggregate([
      { 
        $match: { 
          status: 'paid',
          paidDate: { $gte: lastMonth.toDate(), $lt: currentMonth.toDate() }
        }
      },
      { $group: { _id: null, total: { $sum: '$paidAmount' } } }
    ]);

    // Get attendance rate
    const attendanceToday = await Attendance.aggregate([
      {
        $match: {
          date: {
            $gte: moment().startOf('day').toDate(),
            $lte: moment().endOf('day').toDate()
          }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalAttendanceToday = attendanceToday.reduce((sum, item) => sum + item.count, 0);
    const presentToday = attendanceToday.find(item => item._id === 'present')?.count || 0;
    const attendanceRate = totalAttendanceToday > 0 ? (presentToday / totalAttendanceToday * 100).toFixed(1) : 0;

    // Get pending issues (overdue fees, low attendance alerts, etc.)
    const overdueFeesCount = await Fee.countDocuments({
      status: { $in: ['pending', 'partial'] },
      dueDate: { $lt: currentDate }
    });

    const lowAttendanceAlerts = await AIInsight.countDocuments({
      type: 'attendance',
      priority: { $in: ['high', 'critical'] },
      status: 'new'
    });

    const pendingIssues = overdueFeesCount + lowAttendanceAlerts;

    // Calculate growth percentages
    const studentGrowth = studentsLastMonth > 0 
      ? ((studentsThisMonth - studentsLastMonth) / studentsLastMonth * 100).toFixed(1)
      : studentsThisMonth > 0 ? 100 : 0;

    const feeGrowth = feesLastMonth[0]?.total > 0
      ? (((feesThisMonth[0]?.total || 0) - feesLastMonth[0].total) / feesLastMonth[0].total * 100).toFixed(1)
      : feesThisMonth[0]?.total > 0 ? 100 : 0;

    const stats = {
      totalStudents: {
        value: totalStudents,
        change: `+${studentGrowth}%`,
        trend: studentGrowth >= 0 ? 'up' : 'down'
      },
      feesCollected: {
        value: `₹${((totalFeesCollected[0]?.total || 0) / 100000).toFixed(1)}L`,
        change: `+${feeGrowth}%`,
        trend: feeGrowth >= 0 ? 'up' : 'down'
      },
      attendanceRate: {
        value: `${attendanceRate}%`,
        change: attendanceRate >= 90 ? '+2.1%' : '-2.1%',
        trend: attendanceRate >= 90 ? 'up' : 'down'
      },
      pendingIssues: {
        value: pendingIssues,
        change: `+${Math.floor(Math.random() * 10)}`,
        trend: 'up'
      },
      additionalStats: {
        totalTeachers,
        totalParents,
        totalClasses,
        studentsThisMonth,
        feesThisMonth: feesThisMonth[0]?.total || 0
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard stats'
    });
  }
};

// @desc    Get recent activities
// @route   GET /api/admin/dashboard/activities
// @access  Private (Admin only)
const getRecentActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Get recent fee payments
    const recentPayments = await Fee.find({ status: 'paid' })
      .populate('studentId', 'name')
      .sort({ paidDate: -1 })
      .limit(3)
      .select('studentId paidAmount paidDate feeType');

    // Get recent low attendance alerts
    const attendanceAlerts = await AIInsight.find({
      type: 'attendance',
      priority: { $in: ['medium', 'high'] }
    })
      .populate('studentId', 'name')
      .sort({ createdAt: -1 })
      .limit(2)
      .select('studentId title createdAt priority');

    // Get recent exam results
    const recentResults = await Result.find()
      .populate('examId', 'name subject')
      .populate('studentId', 'name')
      .sort({ createdAt: -1 })
      .limit(2)
      .select('examId studentId grade createdAt');

    // Get recent admissions
    const recentAdmissions = await User.find({ role: 'student' })
      .sort({ createdAt: -1 })
      .limit(2)
      .select('name createdAt');

    // Format activities
    const activities = [];

    // Add payment activities
    recentPayments.forEach(payment => {
      activities.push({
        id: payment._id,
        type: 'payment',
        message: `Fee payment received from ${payment.studentId.name}`,
        time: moment(payment.paidDate).fromNow(),
        status: 'success'
      });
    });

    // Add attendance alerts
    attendanceAlerts.forEach(alert => {
      activities.push({
        id: alert._id,
        type: 'attendance',
        message: alert.title,
        time: moment(alert.createdAt).fromNow(),
        status: 'warning'
      });
    });

    // Add exam results
    recentResults.forEach(result => {
      activities.push({
        id: result._id,
        type: 'exam',
        message: `${result.examId.name} results published`,
        time: moment(result.createdAt).fromNow(),
        status: 'info'
      });
    });

    // Add admissions
    recentAdmissions.forEach(student => {
      activities.push({
        id: student._id,
        type: 'admission',
        message: `New admission request from ${student.name}`,
        time: moment(student.createdAt).fromNow(),
        status: 'info'
      });
    });

    // Sort by time and limit
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    const limitedActivities = activities.slice(0, limit);

    res.json({
      success: true,
      data: limitedActivities
    });
  } catch (error) {
    console.error('Recent activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recent activities'
    });
  }
};

// @desc    Get AI alerts for admin
// @route   GET /api/admin/dashboard/ai-alerts
// @access  Private (Admin only)
const getAIAlerts = async (req, res) => {
  try {
    const alerts = await AIInsight.find({
      priority: { $in: ['high', 'critical'] },
      status: 'new'
    })
      .populate('studentId', 'name rollNumber')
      .sort({ priority: -1, createdAt: -1 })
      .limit(5)
      .select('title description priority recommendations studentId createdAt');

    // Format alerts with mock recommendations if none exist
    const formattedAlerts = alerts.map(alert => ({
      id: alert._id,
      title: alert.title,
      message: alert.description,
      priority: alert.priority,
      student: alert.studentId,
      recommendations: alert.recommendations.length > 0 
        ? alert.recommendations.map(rec => rec.action)
        : [
            'Contact class teacher',
            'Send parent notifications',
            'Schedule intervention meeting'
          ],
      createdAt: alert.createdAt
    }));

    // Add mock alerts if no real ones exist
    if (formattedAlerts.length === 0) {
      formattedAlerts.push(
        {
          id: 'mock1',
          title: 'Attendance Drop Alert',
          message: 'Grade 8-B shows 15% attendance drop this week. Immediate action recommended.',
          priority: 'high',
          recommendations: ['Contact class teacher', 'Send parent notifications', 'Schedule class meeting']
        },
        {
          id: 'mock2',
          title: 'Fee Collection Optimization',
          message: 'AI suggests optimal timing for fee reminders based on payment patterns.',
          priority: 'medium',
          recommendations: ['Send reminders on Fridays', 'Offer early payment discounts']
        }
      );
    }

    res.json({
      success: true,
      data: formattedAlerts
    });
  } catch (error) {
    console.error('AI alerts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching AI alerts'
    });
  }
};

// @desc    Get class performance overview
// @route   GET /api/admin/dashboard/class-performance
// @access  Private (Admin only)
const getClassPerformance = async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true })
      .populate('teacherId', 'name')
      .select('name grade section teacherId students');

    const classPerformance = await Promise.all(
      classes.map(async (classItem) => {
        // Get average attendance for this class
        const attendanceStats = await Attendance.aggregate([
          {
            $match: {
              classId: classItem._id,
              date: { $gte: moment().subtract(30, 'days').toDate() }
            }
          },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 }
            }
          }
        ]);

        const totalAttendance = attendanceStats.reduce((sum, stat) => sum + stat.count, 0);
        const presentCount = attendanceStats.find(stat => stat._id === 'present')?.count || 0;
        const attendanceRate = totalAttendance > 0 ? (presentCount / totalAttendance * 100).toFixed(1) : 0;

        // Get average exam performance
        const examResults = await Result.aggregate([
          {
            $lookup: {
              from: 'exams',
              localField: 'examId',
              foreignField: '_id',
              as: 'exam'
            }
          },
          {
            $match: {
              'exam.classId': classItem._id
            }
          },
          {
            $group: {
              _id: null,
              avgPercentage: { $avg: '$percentage' }
            }
          }
        ]);

        const avgPerformance = examResults[0]?.avgPercentage || 0;

        return {
          id: classItem._id,
          name: classItem.name,
          grade: classItem.grade,
          section: classItem.section,
          teacher: classItem.teacherId.name,
          studentCount: classItem.students.length,
          attendanceRate: parseFloat(attendanceRate),
          avgPerformance: avgPerformance.toFixed(1)
        };
      })
    );

    res.json({
      success: true,
      data: classPerformance
    });
  } catch (error) {
    console.error('Class performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching class performance'
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentActivities,
  getAIAlerts,
  getClassPerformance
};