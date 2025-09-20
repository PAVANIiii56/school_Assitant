import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/auth/Login';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { ParentDashboard } from './components/dashboard/ParentDashboard';
import { StudentDashboard } from './components/dashboard/StudentDashboard';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    return <Login />;
  }

  const renderDashboard = () => {
    if (activeTab !== 'dashboard') {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Module
            </h3>
            <p className="text-gray-600">This module is coming soon!</p>
          </div>
        </div>
      );
    }

    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-white">
            <Sidebar activeTab={activeTab} onTabChange={(tab) => {
              setActiveTab(tab);
              setMobileMenuOpen(false);
            }} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderDashboard()}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;