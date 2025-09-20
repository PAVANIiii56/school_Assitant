const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Class = require('../models/Class');
const Attendance = require('../models/Attendance');
const Fee = require('../models/Fee');
const Exam = require('../models/Exam');
const Result = require('../models/Result');
const AIInsight = require('../models/AIInsight');
const moment = require('moment');

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Class.deleteMany({});
    await Attendance.deleteMany({});
    await Fee.deleteMany({});
    await Exam.deleteMany({});
    await Result.deleteMany({});
    await AIInsight.deleteMany({});

    console.log('Cleared existing data');

    // Create Admin
    const admin = await User.create({
      name: 'Sarah Johnson',
      email: 'admin@school.edu',
      password: 'demo123',
      role: 'admin',
      phone: '+1234567890',
      isActive: true,
      isEmailVerified: true,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    });

    // Create Teachers
    const teacher1 = await User.create({
      name: 'Michael Chen',
      email: 'teacher@school.edu',
      password: 'demo123',
      role: 'teacher',
      phone: '+1234567891',
      subjects: ['Mathematics', 'Physics'],
      qualification: 'M.Sc. Mathematics',
      experience: 8,
      isActive: true,
      isEmailVerified: true,
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
    });

    const teacher2 = await User.create({
      name: 'Dr. Emily Davis',
      email: 'teacher2@school.edu',
      password: 'demo123',
      role: 'teacher',
      phone: '+1234567892',
      subjects: ['Chemistry', 'Biology'],
      qualification: 'Ph.D. Chemistry',
      experience: 12,
      isActive: true,
      isEmailVerified: true,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    });

    // Create Classes
    const class10A = await Class.create({
      name: 'Grade 10-A',
      grade: '10',
      section: 'A',
      teacherId: teacher1._id,
      subjects: [
        { name: 'Mathematics', teacherId: teacher1._id },
        { name: 'Physics', teacherId: teacher1._id },
        { name: 'Chemistry', teacherId: teacher2._id },
        { name: 'Biology', teacherId: teacher2._id },
        { name: 'English', teacherId: teacher1._id }
      ],
      academicYear: '2024-25',
      maxStudents: 40,
      isActive: true
    });

    const class9A = await Class.create({
      name: 'Grade 9-A',
      grade: '9',
      section: 'A',
      teacherId: teacher2._id,
      subjects: [
        { name: 'Mathematics', teacherId: teacher1._id },
        { name: 'Science', teacherId: teacher2._id },
        { name: 'English', teacherId: teacher1._id },
        { name: 'Social Studies', teacherId: teacher2._id }
      ],
      academicYear: '2024-25',
      maxStudents: 35,
      isActive: true
    });

    // Create Students
    const students = [];
    const studentNames = [
      'Alex Rodriguez', 'Emily Williams', 'James Brown', 'Sophia Davis',
      'Michael Johnson', 'Emma Wilson', 'William Jones', 'Olivia Garcia',
      'Benjamin Miller', 'Ava Martinez', 'Lucas Anderson', 'Isabella Taylor',
      'Henry Thomas', 'Mia Jackson', 'Alexander White', 'Charlotte Harris'
    ];

    for (let i = 0; i < studentNames.length; i++) {
      const student = await User.create({
        name: studentNames[i],
        email: `student${i + 1}@school.edu`,
        password: 'demo123',
        role: 'student',
        rollNumber: `2024${String(i + 1).padStart(3, '0')}`,
        classId: i < 8 ? class10A._id : class9A._id,
        dateOfBirth: moment().subtract(15 + Math.floor(Math.random() * 2), 'years').toDate(),
        isActive: true,
        isEmailVerified: true,
        avatar: `https://images.pexels.com/photos/${712513 + i}/pexels-photo-${712513 + i}.jpeg?auto=compress&cs=tinysrgb&w=150`
      });
      students.push(student);
    }

    // Update classes with students
    await Class.findByIdAndUpdate(class10A._id, {
      students: students.slice(0, 8).map(s => s._id)
    });
    await Class.findByIdAndUpdate(class9A._id, {
      students: students.slice(8).map(s => s._id)
    });

    // Create Parents
    const parents = [];
    for (let i = 0; i < 8; i++) {
      const parent = await User.create({
        name: `Parent of ${studentNames[i]}`,
        email: `parent${i + 1}@school.edu`,
        password: 'demo123',
        role: 'parent',
        phone: `+123456789${i}`,
        studentIds: [students[i]._id],
        isActive: true,
        isEmailVerified: true,
        avatar: `https://images.pexels.com/photos/${415829 + i}/pexels-photo-${415829 + i}.jpeg?auto=compress&cs=tinysrgb&w=150`
      });
      parents.push(parent);

      // Update student with parent ID
      await User.findByIdAndUpdate(students[i]._id, {
        parentIds: [parent._id]
      });
    }

    // Create one main parent for demo
    const mainParent = await User.create({
      name: 'Emma Williams',
      email: 'parent@school.edu',
      password: 'demo123',
      role: 'parent',
      phone: '+1234567893',
      studentIds: [students[1]._id], // Emily Williams
      isActive: true,
      isEmailVerified: true,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    });

    // Create main student for demo
    const mainStudent = await User.create({
      name: 'Alex Rodriguez',
      email: 'student@school.edu',
      password: 'demo123',
      role: 'student',
      rollNumber: '2024001',
      classId: class10A._id,
      dateOfBirth: moment().subtract(16, 'years').toDate(),
      isActive: true,
      isEmailVerified: true,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    });

    // Generate Attendance Records
    console.log('Generating attendance records...');
    const attendanceRecords = [];
    const last30Days = [];
    for (let i = 0; i < 30; i++) {
      last30Days.push(moment().subtract(i, 'days').toDate());
    }

    for (const student of students) {
      for (const date of last30Days) {
        // Skip weekends
        if (moment(date).day() === 0 || moment(date).day() === 6) continue;

        const status = Math.random() > 0.1 ? 'present' : (Math.random() > 0.5 ? 'absent' : 'late');
        attendanceRecords.push({
          studentId: student._id,
          classId: student.classId,
          date,
          status,
          markedBy: teacher1._id,
          subject: 'Mathematics',
          period: 1,
          markedAt: moment(date).add(9, 'hours').toDate()
        });
      }
    }

    await Attendance.insertMany(attendanceRecords);

    // Generate Fee Records
    console.log('Generating fee records...');
    const feeTypes = ['tuition', 'exam', 'library', 'transport'];
    const feeRecords = [];

    for (const student of students) {
      for (const feeType of feeTypes) {
        const amount = feeType === 'tuition' ? 25000 : 
                      feeType === 'transport' ? 5000 :
                      feeType === 'exam' ? 2000 : 1000;
        
        const isPaid = Math.random() > 0.3;
        feeRecords.push({
          studentId: student._id,
          academicYear: '2024-25',
          feeType,
          amount,
          dueDate: moment().add(Math.floor(Math.random() * 60), 'days').toDate(),
          status: isPaid ? 'paid' : 'pending',
          paidAmount: isPaid ? amount : 0,
          paidDate: isPaid ? moment().subtract(Math.floor(Math.random() * 30), 'days').toDate() : null,
          paymentMethod: isPaid ? 'online' : null,
          createdBy: admin._id
        });
      }
    }

    await Fee.insertMany(feeRecords);

    // Generate Exams
    console.log('Generating exams...');
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
    const exams = [];

    for (const subject of subjects) {
      const exam = await Exam.create({
        name: `${subject} Mid-Term Exam`,
        type: 'mid_term',
        subject,
        classId: class10A._id,
        teacherId: subject === 'Mathematics' || subject === 'Physics' ? teacher1._id : teacher2._id,
        date: moment().subtract(Math.floor(Math.random() * 30), 'days').toDate(),
        startTime: '09:00',
        duration: 180, // 3 hours
        totalMarks: 100,
        passingMarks: 40,
        academicYear: '2024-25',
        term: '2nd',
        status: 'completed'
      });
      exams.push(exam);
    }

    // Generate Results
    console.log('Generating results...');
    const results = [];
    for (const exam of exams) {
      for (const student of students.slice(0, 8)) { // Only for class 10A students
        const marksObtained = Math.floor(Math.random() * 40) + 60; // 60-100 marks
        const percentage = (marksObtained / exam.totalMarks) * 100;
        
        let grade = 'F';
        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 85) grade = 'A';
        else if (percentage >= 80) grade = 'A-';
        else if (percentage >= 75) grade = 'B+';
        else if (percentage >= 70) grade = 'B';
        else if (percentage >= 65) grade = 'B-';
        else if (percentage >= 60) grade = 'C+';
        else if (percentage >= 55) grade = 'C';
        else if (percentage >= 50) grade = 'C-';
        else if (percentage >= 40) grade = 'D';

        results.push({
          examId: exam._id,
          studentId: student._id,
          marksObtained,
          grade,
          percentage,
          rank: Math.floor(Math.random() * 8) + 1,
          evaluatedBy: exam.teacherId,
          evaluatedAt: moment(exam.date).add(7, 'days').toDate()
        });
      }
    }

    await Result.insertMany(results);

    // Generate AI Insights
    console.log('Generating AI insights...');
    const insights = [
      {
        studentId: students[0]._id,
        type: 'performance',
        category: 'academic',
        title: 'Strong in Science Subjects',
        description: 'Student shows exceptional performance in Physics and Chemistry. Consider advanced science programs.',
        priority: 'low',
        confidence: 92,
        subject: 'Physics',
        recommendations: [
          {
            action: 'Enroll in advanced physics program',
            description: 'Student ready for more challenging physics concepts',
            priority: 'medium',
            estimatedImpact: 'High - Will maintain engagement and accelerate learning',
            resources: ['Advanced physics curriculum', 'Science competition opportunities']
          }
        ],
        status: 'new'
      },
      {
        studentId: students[1]._id,
        type: 'attendance',
        category: 'academic',
        title: 'Attendance Improvement Needed',
        description: 'Student attendance has dropped to 78% this month. Immediate intervention recommended.',
        priority: 'high',
        confidence: 88,
        recommendations: [
          {
            action: 'Contact parents',
            description: 'Schedule meeting to discuss attendance issues',
            priority: 'high',
            estimatedImpact: 'High - Parental involvement crucial for attendance improvement',
            resources: ['Parent meeting template', 'Attendance tracking sheet']
          }
        ],
        status: 'new'
      },
      {
        studentId: students[2]._id,
        type: 'recommendation',
        category: 'academic',
        title: 'Math Skills Enhancement',
        description: 'Student would benefit from additional math practice sessions to improve problem-solving speed.',
        priority: 'medium',
        confidence: 75,
        subject: 'Mathematics',
        recommendations: [
          {
            action: 'Extra math practice sessions',
            description: 'Schedule 2 additional practice sessions per week',
            priority: 'medium',
            estimatedImpact: 'Medium - Regular practice improves speed and accuracy',
            resources: ['Math practice worksheets', 'Online math tools']
          }
        ],
        status: 'new'
      }
    ];

    await AIInsight.insertMany(insights);

    console.log('Database seeding completed successfully!');
    console.log('\n=== Demo Accounts ===');
    console.log('Admin: admin@school.edu / demo123');
    console.log('Teacher: teacher@school.edu / demo123');
    console.log('Parent: parent@school.edu / demo123');
    console.log('Student: student@school.edu / demo123');
    console.log('\nAll accounts use password: demo123');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = { seedDatabase };

// Run seeder if called directly
if (require.main === module) {
  const dotenv = require('dotenv');
  const connectDB = require('../config/database');
  
  dotenv.config();
  connectDB().then(() => {
    seedDatabase().then(() => {
      console.log('Seeding completed');
      process.exit(0);
    }).catch(err => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
  });
}