import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Calendar, 
  DollarSign, 
  GraduationCap, 
  TrendingUp,
  AlertCircle,
  BookOpen,
  Target,
  Award
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const childData = {
    name: 'Emily Williams',
    class: 'Grade 10-A',
    rollNumber: '2024001',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150'
  };

  const quickStats = [
    {
      title: 'Attendance This Month',
      value: '92%',
      change: '+3%',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Fee Status',
      value: 'Paid',
      change: 'Due: 15 Jan',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Overall Grade',
      value: 'A-',
      change: '+5 pts',
      icon: GraduationCap,
      color: 'purple'
    },
    {
      title: 'Class Rank',
      value: '#7',
      change: '+2 positions',
      icon: TrendingUp,
      color: 'yellow'
    }
  ];

  const recentResults = [
    { subject: 'Mathematics', marks: 85, total: 100, grade: 'A', trend: 'up' },
    { subject: 'Physics', marks: 78, total: 100, grade: 'B+', trend: 'stable' },
    { subject: 'Chemistry', marks: 82, total: 100, grade: 'A-', trend: 'up' },
    { subject: 'English', marks: 88, total: 100, grade: 'A', trend: 'up' },
    { subject: 'History', marks: 75, total: 100, grade: 'B+', trend: 'down' }
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'strength',
      title: '🌟 Strong in Science',
      description: 'Emily excels in Physics and Chemistry. Consider advanced science programs.',
      priority: 'positive'
    },
    {
      id: 2,
      type: 'improvement',
      title: '📈 Math Improvement',
      description: 'Math scores improved by 12% this month. Great progress!',
      priority: 'positive'
    },
    {
      id: 3,
      type: 'attention',
      title: '⚠️ History Attention',
      description: 'History performance declining. Recommend extra practice sessions.',
      priority: 'warning'
    }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Meeting', date: 'Jan 20, 2024', time: '3:00 PM' },
    { id: 2, title: 'Science Exhibition', date: 'Jan 25, 2024', time: '10:00 AM' },
    { id: 3, title: 'Term End Exams', date: 'Feb 1-15, 2024', time: 'Various' }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      green: 'text-green-600 bg-green-100',
      blue: 'text-blue-600 bg-blue-100',
      purple: 'text-purple-600 bg-purple-100',
      yellow: 'text-yellow-600 bg-yellow-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section with Child Info */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20">
            <img
              src={childData.avatar}
              alt={childData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome, Emma! 👋</h2>
            <p className="opacity-90 text-lg">{childData.name} • {childData.class}</p>
            <p className="opacity-80 text-sm">Roll Number: {childData.rollNumber}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <Card key={stat.title} hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${getIconColor(stat.color)}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Recent Exam Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div key={result.subject} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      result.trend === 'up' ? 'bg-green-500' :
                      result.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{result.subject}</p>
                      <p className="text-sm text-gray-600">{result.marks}/{result.total}</p>
                    </div>
                  </div>
                  <Badge variant={
                    result.grade.startsWith('A') ? 'success' :
                    result.grade.startsWith('B') ? 'info' : 'warning'
                  }>
                    {result.grade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              AI Learning Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className={`p-4 rounded-lg border ${
                  insight.priority === 'positive' ? 'border-green-200 bg-green-50' :
                  insight.priority === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-gray-200 bg-gray-50'
                }`}>
                  <h4 className="font-medium text-gray-900 mb-2">{insight.title}</h4>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex-col gap-2">
                <DollarSign className="w-5 h-5" />
                Pay Fees
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="w-5 h-5" />
                View Attendance
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BookOpen className="w-5 h-5" />
                Download Reports
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <AlertCircle className="w-5 h-5" />
                Contact Teacher
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};