// src/pages/public/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { Button } from '../../components/common/Button';

export function ForgotPassword() {
  const { showToast } = useHrms();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      showToast('Password reset instructions sent to your email.', 'success');
    }, 900);
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
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1 text-center">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">
              Reset Your Password
            </h2>
            <p className="text-xs text-surface-400">
              Enter your corporate email address to receive password recovery instructions.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs text-surface-600 dark:text-surface-300">
                A password reset link has been dispatched to <strong>{email}</strong>.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
                className="w-full font-bold"
              >
                Back to Sign In
              </Button>
            </div>
          ) : (
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

              <Button
                variant="primary"
                size="lg"
                type="submit"
                icon={Send}
                isLoading={isLoading}
                className="w-full font-bold shadow-glow-sm py-2.5 text-sm"
              >
                Send Reset Link
              </Button>
            </form>
          )}

          <div className="text-center text-xs text-surface-500 dark:text-surface-400 pt-2 border-t border-surface-100 dark:border-surface-800">
            <Link to="/login" className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 font-bold hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}