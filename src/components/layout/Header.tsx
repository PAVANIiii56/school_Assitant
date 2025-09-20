import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, Menu } from 'lucide-react';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const { user } = useAuth();
  const [notifications] = useState([
    { id: '1', title: 'New fee payment received', unread: true },
    { id: '2', title: 'Parent-teacher meeting scheduled', unread: true },
    { id: '3', title: 'Monthly report ready', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="hidden md:block flex-1 max-w-md">
          <Input
            placeholder="Search students, classes, or records..."
            icon={<Search className="w-4 h-4" />}
            className="w-full"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <Badge
                  variant="danger"
                  size="sm"
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};