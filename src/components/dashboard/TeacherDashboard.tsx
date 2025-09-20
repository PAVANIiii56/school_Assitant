import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Clock, 
  Users, 
  BookOpen, 
  AlertCircle,
  CheckCircle,
  Calendar
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const todaysClasses = [
    { id: 1, subject: 'Mathematics', class: 'Grade 10-A', time: '9:00 AM', duration: '45 min', status: 'upcoming' },
    { id: 2, subject: 'Physics', class: 'Grade 10-B', time: '10:00 AM', duration: '45 min', status: 'current' },
    { id: 3, subject: 'Mathematics', class: 'Grade 9-A', time: '11:30 AM', duration: '45 min', status: 'upcoming' },
    { id: 4, subject: 'Physics', class: 'Grade 9-B', time: '2:00 PM', duration: '45 min', status: 'upcoming' },
  ];

  const pendingTasks = [
    { id: 1, task: 'Grade Grade 10-A Math Quiz', dueDate: 'Today', priority: 'high' },
    { id: 2, task: 'Prepare Physics Lab Report', dueDate: 'Tomorrow', priority: 'medium' },
    { id: 3, task: 'Submit Monthly Progress Report', dueDate: 'Friday', priority: 'high' },
    { id: 4, task: 'Update Lesson Plans', dueDate: 'Next Week', priority: 'low' },
  ];

  const weakStudents = [
    { id: 1, name: 'Alex Johnson', class: 'Grade 10-A', subject: 'Mathematics', score: 45, trend: 'declining' },
    { id: 2, name: 'Maria Garcia', class: 'Grade 10-B', subject: 'Physics', score: 52, trend: 'improving' },
    { id: 3, name: 'David Chen', class: 'Grade 9-A', subject: 'Mathematics', score: 48, trend: 'stable' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'neutral';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Good morning, Michael! 🌟</h2>
        <p className="opacity-90">You have 4 classes scheduled today. Let's make it great!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-600">Classes Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">124</p>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">7</p>
                <p className="text-sm text-gray-600">Pending Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Need Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(classItem.status)}`}>
                      {classItem.status}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{classItem.subject}</p>
                      <p className="text-sm text-gray-600">{classItem.class} • {classItem.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{classItem.time}</p>
                    {classItem.status === 'current' && (
                      <Button size="sm" className="mt-1">Mark Attendance</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{task.task}</p>
                      <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <Badge variant={getPriorityColor(task.priority) as any}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights - Students Need Attention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            AI Insights: Students Needing Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weakStudents.map((student) => (
              <div key={student.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{student.name}</h4>
                  <Badge variant={student.score < 50 ? 'danger' : 'warning'}>
                    {student.score}%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{student.class} • {student.subject}</p>
                <p className="text-xs text-gray-500 mb-3">Trend: {student.trend}</p>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full">Schedule Meeting</Button>
                  <Button size="sm" variant="ghost" className="w-full">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};