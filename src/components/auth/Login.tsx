import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { GraduationCap, Mail, Lock, Users, BookOpen, Star } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const demoAccounts = [
    { role: 'Admin', email: 'admin@school.edu', icon: Users, color: 'blue' },
    { role: 'Teacher', email: 'teacher@school.edu', icon: BookOpen, color: 'green' },
    { role: 'Parent', email: 'parent@school.edu', icon: Star, color: 'purple' },
    { role: 'Student', email: 'student@school.edu', icon: GraduationCap, color: 'orange' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  const getColorStyles = (color: string) => {
    const styles = {
      blue: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100',
      green: 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100',
      purple: 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100',
      orange: 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100'
    };
    return styles[color as keyof typeof styles];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-green-600 text-white flex-col justify-center px-12">
        <div className="max-w-md">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold">EduFlow AI</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">
            Transform Education with AI-Powered Insights
          </h2>
          
          <p className="text-xl opacity-90 mb-8">
            Streamline school management, enhance learning outcomes, and connect the entire school community.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span>Role-based dashboards for all stakeholders</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span>AI-driven insights for better learning</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <span>Real-time communication & updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EduFlow AI</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your account to continue</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                
                <Input
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  icon={<Lock className="w-4 h-4" />}
                  required
                />

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  loading={loading}
                  className="w-full"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or try demo accounts</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.role}
                      onClick={() => handleDemoLogin(account.email)}
                      className={`p-3 border rounded-lg transition-all duration-200 ${getColorStyles(account.color)}`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <account.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{account.role}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Click any role above to login as that user (password: demo123)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};