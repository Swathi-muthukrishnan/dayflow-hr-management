
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck, User, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHrms } from '../../context/HrmsContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export function Login() {
  const { login, switchDemoRole } = useAuth();
  const { showToast } = useHrms();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.rivera@dayflow.io');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await login(email, password);
      showToast(`Welcome back, ${user.name}!`, 'success');
      if (user.role === 'HR/Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please verify or use 1-click Demo Login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const user = switchDemoRole(role);
    showToast(`Logged in with Demo Persona: ${user.name} (${user.role})`, 'success');
    if (role === 'HR/Admin' || role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/employee/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col justify-center items-center p-4 sm:p-6 font-sans transition-colors duration-200">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-500 flex items-center justify-center text-white shadow-glow-sm font-extrabold text-2xl">
              D
            </div>
            <span className="font-black text-2xl tracking-tight text-surface-900 dark:text-white">
              DAYFLOW
            </span>
          </Link>
          <p className="text-xs text-surface-500 dark:text-surface-400 font-mono">
            “Every workday, perfectly aligned.”
          </p>
        </div>

        {/* Login Box */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1 text-center">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-surface-400">
              Access your personalized HRMS employee or admin portal
            </p>
          </div>

          {/* 1-Click Hackathon Demo Buttons */}
          <div className="space-y-2.5 p-3 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-800/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 font-mono flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              1-Click Demo Evaluation Login
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('Employee')}
                className="p-2 rounded-xl bg-white dark:bg-surface-900 border border-brand-300 dark:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-900/60 text-xs font-bold text-brand-700 dark:text-brand-300 flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Employee</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('HR/Admin')}
                className="p-2 rounded-xl bg-white dark:bg-surface-900 border border-brand-300 dark:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-900/60 text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>HR Admin</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 font-mono mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@dayflow.io"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs sm:text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-surface-500 font-mono">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs sm:text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              icon={LogIn}
              isLoading={isLoading}
              className="w-full font-bold shadow-glow-sm py-2.5 text-sm"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center text-xs text-surface-500 dark:text-surface-400 pt-2 border-t border-surface-100 dark:border-surface-800">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}