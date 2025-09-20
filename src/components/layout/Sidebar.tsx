import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  GraduationCap, 
  MessageCircle, 
  Brain,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'ai-insights', label: 'AI Insights', icon: Brain },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { id: 'students', label: 'Students', icon: Users },
          { id: 'teachers', label: 'Teachers', icon: GraduationCap },
          { id: 'fees', label: 'Fees Management', icon: DollarSign },
          { id: 'attendance', label: 'Attendance', icon: Calendar },
          { id: 'exams', label: 'Exams & Results', icon: GraduationCap },
          { id: 'communication', label: 'Communication', icon: MessageCircle },
        ];
      case 'teacher':
        return [
          ...baseItems,
          { id: 'attendance', label: 'Attendance', icon: Calendar },
          { id: 'exams', label: 'Exams & Results', icon: GraduationCap },
          { id: 'students', label: 'My Students', icon: Users },
          { id: 'communication', label: 'Messages', icon: MessageCircle },
        ];
      case 'parent':
        return [
          ...baseItems,
          { id: 'attendance', label: 'Child Attendance', icon: Calendar },
          { id: 'fees', label: 'Fee Payments', icon: DollarSign },
          { id: 'results', label: 'Results', icon: GraduationCap },
          { id: 'communication', label: 'Messages', icon: MessageCircle },
        ];
      case 'student':
        return [
          ...baseItems,
          { id: 'timetable', label: 'Timetable', icon: Calendar },
          { id: 'homework', label: 'Homework', icon: GraduationCap },
          { id: 'results', label: 'My Results', icon: GraduationCap },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">EduFlow AI</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200',
              activeTab === item.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Settings and Logout */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => onTabChange('settings')}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200',
            activeTab === 'settings'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};