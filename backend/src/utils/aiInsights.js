const AIInsight = require('../models/AIInsight');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Result = require('../models/Result');
const moment = require('moment');

// Generate AI insights for students
const generateStudentInsights = async (studentId) => {
  try {
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      throw new Error('Invalid student ID');
    }

    const insights = [];

    // Attendance insights
    const attendanceInsight = await generateAttendanceInsight(studentId);
    if (attendanceInsight) insights.push(attendanceInsight);

    // Performance insights
    const performanceInsight = await generatePerformanceInsight(studentId);
    if (performanceInsight) insights.push(performanceInsight);

    // Behavioral insights
    const behaviorInsight = await generateBehaviorInsight(studentId);
    if (behaviorInsight) insights.push(behaviorInsight);

    // Save insights to database
    const savedInsights = await Promise.all(
      insights.map(insight => AIInsight.create(insight))
    );

    return savedInsights;
  } catch (error) {
    console.error('Error generating student insights:', error);
    throw error;
  }
};

// Generate attendance-based insights
const generateAttendanceInsight = async (studentId) => {
  try {
    const thirtyDaysAgo = moment().subtract(30, 'days').toDate();
    
    const attendanceRecords = await Attendance.find({
      studentId,
      date: { $gte: thirtyDaysAgo }
    });

    if (attendanceRecords.length === 0) return null;

    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(record => record.status === 'present').length;
    const attendanceRate = (presentDays / totalDays) * 100;

    let insight = null;

    if (attendanceRate < 75) {
      insight = {
        studentId,
        type: 'attendance',
        category: 'academic',
        title: 'Low Attendance Alert',
        description: `Student has ${attendanceRate.toFixed(1)}% attendance in the last 30 days, which is below the required 75%.`,
        priority: attendanceRate < 60 ? 'critical' : 'high',
        confidence: 95,
        recommendations: [
          {
            action: 'Contact parents immediately',
            description: 'Discuss attendance issues and create improvement plan',
            priority: 'high',
            estimatedImpact: 'High - Direct parental involvement often improves attendance',
            resources: ['Parent meeting template', 'Attendance improvement plan']
          },
          {
            action: 'Identify attendance barriers',
            description: 'Understand reasons for absences (health, transport, family issues)',
            priority: 'medium',
            estimatedImpact: 'Medium - Addressing root causes prevents future absences',
            resources: ['Student counseling session', 'Family support services']
          }
        ],
        dataPoints: [
          { metric: 'attendance_rate', value: attendanceRate, date: new Date() },
          { metric: 'total_days', value: totalDays, date: new Date() },
          { metric: 'present_days', value: presentDays, date: new Date() }
        ]
      };
    } else if (attendanceRate >= 95) {
      insight = {
        studentId,
        type: 'attendance',
        category: 'academic',
        title: 'Excellent Attendance',
        description: `Student maintains excellent attendance of ${attendanceRate.toFixed(1)}% - well above average.`,
        priority: 'low',
        confidence: 98,
        recommendations: [
          {
            action: 'Recognize achievement',
            description: 'Acknowledge consistent attendance in class or school assembly',
            priority: 'low',
            estimatedImpact: 'Medium - Recognition motivates continued good behavior',
            resources: ['Certificate template', 'Achievement badge']
          }
        ],
        dataPoints: [
          { metric: 'attendance_rate', value: attendanceRate, date: new Date() }
        ]
      };
    }

    return insight;
  } catch (error) {
    console.error('Error generating attendance insight:', error);
    return null;
  }
};

// Generate performance-based insights
const generatePerformanceInsight = async (studentId) => {
  try {
    const recentResults = await Result.find({ studentId })
      .populate('examId', 'subject date')
      .sort({ 'examId.date': -1 })
      .limit(10);

    if (recentResults.length < 3) return null;

    // Group by subject
    const subjectPerformance = {};
    recentResults.forEach(result => {
      const subject = result.examId.subject;
      if (!subjectPerformance[subject]) {
        subjectPerformance[subject] = [];
      }
      subjectPerformance[subject].push(result.percentage);
    });

    // Find weak subjects (average < 60%)
    const weakSubjects = [];
    const strongSubjects = [];

    Object.entries(subjectPerformance).forEach(([subject, scores]) => {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      if (average < 60) {
        weakSubjects.push({ subject, average });
      } else if (average >= 85) {
        strongSubjects.push({ subject, average });
      }
    });

    let insight = null;

    if (weakSubjects.length > 0) {
      const weakestSubject = weakSubjects.sort((a, b) => a.average - b.average)[0];
      
      insight = {
        studentId,
        type: 'performance',
        category: 'academic',
        title: `Struggling in ${weakestSubject.subject}`,
        description: `Student's average in ${weakestSubject.subject} is ${weakestSubject.average.toFixed(1)}%, indicating need for additional support.`,
        priority: weakestSubject.average < 40 ? 'critical' : 'high',
        confidence: 88,
        subject: weakestSubject.subject,
        recommendations: [
          {
            action: 'Provide additional tutoring',
            description: `Arrange extra classes or peer tutoring for ${weakestSubject.subject}`,
            priority: 'high',
            estimatedImpact: 'High - Targeted support typically improves scores by 15-20%',
            resources: ['Tutoring schedule template', 'Subject-specific resources']
          },
          {
            action: 'Review study methods',
            description: 'Assess current study techniques and suggest improvements',
            priority: 'medium',
            estimatedImpact: 'Medium - Better study methods improve retention',
            resources: ['Study techniques guide', 'Learning style assessment']
          }
        ],
        predictions: [
          {
            metric: 'subject_performance',
            currentValue: weakestSubject.average,
            predictedValue: weakestSubject.average + 15,
            timeframe: '3 months',
            confidence: 75
          }
        ],
        dataPoints: weakSubjects.map(sub => ({
          metric: 'subject_average',
          value: sub.average,
          date: new Date(),
          subject: sub.subject
        }))
      };
    } else if (strongSubjects.length > 0) {
      const strongestSubject = strongSubjects.sort((a, b) => b.average - a.average)[0];
      
      insight = {
        studentId,
        type: 'performance',
        category: 'academic',
        title: `Excelling in ${strongestSubject.subject}`,
        description: `Student shows exceptional performance in ${strongestSubject.subject} with ${strongestSubject.average.toFixed(1)}% average.`,
        priority: 'low',
        confidence: 92,
        subject: strongestSubject.subject,
        recommendations: [
          {
            action: 'Consider advanced coursework',
            description: `Explore advanced topics or competitions in ${strongestSubject.subject}`,
            priority: 'medium',
            estimatedImpact: 'High - Advanced challenges maintain engagement and growth',
            resources: ['Advanced curriculum', 'Competition opportunities']
          },
          {
            action: 'Peer mentoring opportunity',
            description: 'Student could help peers struggling with this subject',
            priority: 'low',
            estimatedImpact: 'Medium - Teaching others reinforces own learning',
            resources: ['Peer tutoring program', 'Leadership opportunities']
          }
        ]
      };
    }

    return insight;
  } catch (error) {
    console.error('Error generating performance insight:', error);
    return null;
  }
};

// Generate behavioral insights (mock implementation)
const generateBehaviorInsight = async (studentId) => {
  try {
    // This would typically analyze behavioral data, disciplinary records, etc.
    // For now, we'll create mock insights based on patterns
    
    const mockBehaviorInsights = [
      {
        studentId,
        type: 'behavior',
        category: 'social',
        title: 'Strong Leadership Qualities',
        description: 'Student demonstrates natural leadership in group activities and peer interactions.',
        priority: 'low',
        confidence: 78,
        recommendations: [
          {
            action: 'Provide leadership opportunities',
            description: 'Consider student for class monitor or group project leader roles',
            priority: 'medium',
            estimatedImpact: 'High - Leadership roles build confidence and skills',
            resources: ['Leadership training program', 'Student council opportunities']
          }
        ]
      },
      {
        studentId,
        type: 'behavior',
        category: 'social',
        title: 'Needs Social Engagement',
        description: 'Student appears withdrawn in group settings and may benefit from social skill development.',
        priority: 'medium',
        confidence: 65,
        recommendations: [
          {
            action: 'Encourage group participation',
            description: 'Gradually involve student in small group activities',
            priority: 'medium',
            estimatedImpact: 'Medium - Gradual exposure builds social confidence',
            resources: ['Social skills workshop', 'Buddy system program']
          }
        ]
      }
    ];

    // Randomly return one of the mock insights (30% chance)
    if (Math.random() < 0.3) {
      return mockBehaviorInsights[Math.floor(Math.random() * mockBehaviorInsights.length)];
    }

    return null;
  } catch (error) {
    console.error('Error generating behavior insight:', error);
    return null;
  }
};

// Generate insights for all students (batch processing)
const generateBatchInsights = async () => {
  try {
    const students = await User.find({ role: 'student', isActive: true }).select('_id');
    
    console.log(`Generating insights for ${students.length} students...`);
    
    const results = await Promise.allSettled(
      students.map(student => generateStudentInsights(student._id))
    );

    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    console.log(`Batch insight generation completed: ${successful} successful, ${failed} failed`);
    
    return { successful, failed };
  } catch (error) {
    console.error('Error in batch insight generation:', error);
    throw error;
  }
};

module.exports = {
  generateStudentInsights,
  generateAttendanceInsight,
  generatePerformanceInsight,
  generateBehaviorInsight,
  generateBatchInsights
};