import React, { useState } from 'react';
import { Eye, EyeOff, Zap } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate login logic
    console.log('Company login attempted with:', { email, password });
    
    // Replace this with your actual login logic
    setTimeout(() => {
      setLoading(false);
      // setError('Invalid company credentials'); // Example error
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center px-4 py-24">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Company Login</h1>
            <p className="text-gray-600">Access your company dashboard</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Key
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white p-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white p-4 py-2 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <button className="text-blue-500 hover:underline">
                Forgot password?
              </button>
            </div> */}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-medium transition disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Need access?{' '}
              <button className="text-blue-500 hover:underline font-medium">
                Contact Administrator
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p>&copy; 2025 QueueKiller. Company Desktop Application v1.0</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;