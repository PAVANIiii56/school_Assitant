export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
  avatar?: string;
  phone?: string;
  classId?: string;
  studentIds?: string[]; // for parents
}

export interface Student {
  id: string;
  name: string;
  email: string;
  classId: string;
  rollNumber: string;
  parentIds: string[];
  avatar?: string;
  dateOfBirth: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  subjects: string[];
  studentCount: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedBy: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  type: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  classId: string;
  date: string;
  totalMarks: number;
  duration: string;
}

export interface Result {
  id: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  grade: string;
  remarks?: string;
}

export interface AIInsight {
  id: string;
  studentId: string;
  type: 'performance' | 'attendance' | 'behavior' | 'recommendation';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionItems?: string[];
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}