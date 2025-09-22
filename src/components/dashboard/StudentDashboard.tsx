import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Calendar, 
  BookOpen, 
  Trophy, 
  Target,
  Clock,
  Star,
  Flame,
  TrendingUp
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const studentData = {
    name: 'Alex Rodriguez',
    class: 'Grade 10-A',
    rollNumber: 'STU001',
    streak: 15
  };

  const todaySchedule = [
    { id: 1, subject: 'Mathematics', time: '9:00 AM', room: 'Room 101', status: 'completed' },
    { id: 2, subject: 'Physics', time: '10:00 AM', room: 'Lab-1', status: 'current' },
    { id: 3, subject: 'English', time: '11:30 AM', room: 'Room 205', status: 'upcoming' },
    { id: 4, subject: 'Chemistry', time: '2:00 PM', room: 'Lab-2', status: 'upcoming' }
  ];

  const homework = [
    { id: 1, subject: 'Mathematics', task: 'Chapter 5 Exercises', dueDate: 'Today', status: 'pending' },
    { id: 2, subject: 'Physics', task: 'Lab Report Submission', dueDate: 'Tomorrow', status: 'completed' },
    { id: 3, subject: 'English', task: 'Essay Writing', dueDate: 'Friday', status: 'in-progress' },
    { id: 4, subject: 'History', task: 'Research Project', dueDate: 'Next Week', status: 'pending' }
  ];

  const achievements = [
    { id: 1, title: 'Math Wizard', description: 'Scored 95+ in last 3 math tests', icon: '🧮', earned: true },
    { id: 2, title: 'Perfect Attendance', description: '15 days streak', icon: '📅', earned: true },
    { id: 3, title: 'Science Star', description: 'Top performer in Physics', icon: '⚗️', earned: true },
    { id: 4, title: 'Team Player', description: 'Active in group projects', icon: '🤝', earned: false }
  ];

  const recentGrades = [
    { subject: 'Mathematics', grade: 'A+', score: 95, trend: 'up' },
    { subject: 'Physics', grade: 'A', score: 88, trend: 'stable' },
    { subject: 'Chemistry', grade: 'A-', score: 82, trend: 'up' },
    { subject: 'English', grade: 'B+', score: 78, trend: 'down' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'current': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section with Gamification */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Alex! 🚀</h2>
            <p className="opacity-90">Ready to conquer another day of learning?</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-6 h-6 text-orange-200" />
                <span className="text-2xl font-bold">{studentData.streak}</span>
              </div>
              <p className="text-sm opacity-80">Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-600">Classes Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Homework Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">87</p>
                <p className="text-sm text-gray-600">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((class_item) => (
                <div key={class_item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(class_item.status)}`}>
                      {class_item.status}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{class_item.subject}</p>
                      <p className="text-sm text-gray-600">{class_item.room}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">{class_item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Homework Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Homework Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {homework.map((hw) => (
                <div key={hw.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={hw.status === 'completed'}
                      className="w-4 h-4 text-blue-600" 
                    />
                    <div>
                      <p className="font-medium text-gray-900">{hw.task}</p>
                      <p className="text-sm text-gray-600">{hw.subject} • Due: {hw.dueDate}</p>
                    </div>
                  </div>
                  <Badge variant={
                    hw.status === 'completed' ? 'success' :
                    hw.status === 'in-progress' ? 'warning' : 'danger'
                  }>
                    {hw.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Recent Grades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGrades.map((grade) => (
                <div key={grade.subject} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      grade.trend === 'up' ? 'bg-green-500' :
                      grade.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{grade.subject}</p>
                      <p className="text-sm text-gray-600">Score: {grade.score}/100</p>
                    </div>
                  </div>
                  <Badge variant={
                    grade.grade.startsWith('A') ? 'success' :
                    grade.grade.startsWith('B') ? 'info' : 'warning'
                  }>
                    {grade.grade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-3 rounded-lg border ${
                  achievement.earned ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                  {achievement.earned && (
                    <Badge variant="success" size="sm" className="mt-2">
                      Earned
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Learning Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            AI Learning Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Today's Learning Goal</h4>
            <p className="text-sm text-gray-600 mb-4">
              Complete Mathematics Chapter 5 exercises and review Physics concepts from yesterday's class.
            </p>
            <div className="flex gap-3">
              <Button size="sm">Start Learning</Button>
              <Button size="sm" variant="outline">View Study Plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};