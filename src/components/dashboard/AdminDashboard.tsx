import React from 'react';
import { useDashboardStats, useRecentActivities, useAIAlerts } from '../../hooks/useApi';
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
  const { data: statsData, loading: statsLoading, error: statsError } = useDashboardStats();
  const { data: activitiesData, loading: activitiesLoading } = useRecentActivities();
  const { data: alertsData, loading: alertsLoading } = useAIAlerts();

  // Transform API data to match component structure
  const stats = statsData ? [
    {
      title: 'Total Students',
      value: statsData.totalStudents.value.toString(),
      change: statsData.totalStudents.change,
      trend: statsData.totalStudents.trend,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Fees Collected',
      value: statsData.feesCollected.value,
      change: statsData.feesCollected.change,
      trend: statsData.feesCollected.trend,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Attendance Rate',
      value: statsData.attendanceRate.value,
      change: statsData.attendanceRate.change,
      trend: statsData.attendanceRate.trend,
      icon: Calendar,
      color: 'yellow'
    },
    {
      title: 'Pending Issues',
      value: statsData.pendingIssues.value.toString(),
      change: statsData.pendingIssues.change,
      trend: statsData.pendingIssues.trend,
      icon: AlertTriangle,
      color: 'red'
    }
  ] : [];

  const recentActivities = activitiesData || [];
  const aiAlerts = alertsData || [];

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      red: 'text-red-600 bg-red-100'
    };
    return colors[color as keyof typeof colors];
  };

  if (statsError) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600">{statsError}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah! 👋</h2>
        <p className="opacity-90">Here's what's happening at your school today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} hover>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          stats.map((stat) => (
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
          ))
        )}
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
              {alertsLoading && (
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin ml-2" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {alertsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Recent Activities
              {activitiesLoading && (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin ml-2" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-3 animate-pulse">
                    <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};