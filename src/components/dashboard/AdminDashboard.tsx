import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Fees Collected',
      value: '₹12.4L',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Attendance Rate',
      value: '94.2%',
      change: '-2.1%',
      trend: 'down',
      icon: Calendar,
      color: 'yellow'
    },
    {
      title: 'Pending Issues',
      value: '23',
      change: '+8',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'payment', message: 'Fee payment received from John Doe', time: '2 mins ago', status: 'success' },
    { id: 2, type: 'attendance', message: 'Low attendance alert for Grade 10-A', time: '15 mins ago', status: 'warning' },
    { id: 3, type: 'exam', message: 'Monthly exam results published', time: '1 hour ago', status: 'info' },
    { id: 4, type: 'admission', message: 'New admission request received', time: '2 hours ago', status: 'info' },
  ];

  const aiAlerts = [
    {
      id: 1,
      title: 'Attendance Drop Alert',
      message: 'Grade 8-B shows 15% attendance drop this week. Immediate action recommended.',
      priority: 'high',
      recommendations: ['Contact class teacher', 'Send parent notifications', 'Schedule class meeting']
    },
    {
      id: 2,
      title: 'Fee Collection Optimization',
      message: 'AI suggests optimal timing for fee reminders based on payment patterns.',
      priority: 'medium',
      recommendations: ['Send reminders on Fridays', 'Offer early payment discounts']
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      red: 'text-red-600 bg-red-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah! 👋</h2>
        <p className="opacity-90">Here's what's happening at your school today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
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
        {/* AI Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-purple-600" />
              </div>
              AI Smart Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiAlerts.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <Badge variant={alert.priority === 'high' ? 'danger' : 'warning'}>
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">AI Recommendations:</p>
                    {alert.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};