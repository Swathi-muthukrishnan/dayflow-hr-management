import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export function EmailVerification() {
  const { currentUser } = useAuth();
  const { showToast } = useHrms();
  const navigate = useNavigate();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (idx, val) => {
    if (val.length <= 1) {
      const updated = [...code];
      updated[idx] = val;
      setCode(updated);

      // Auto advance to next input
      if (val && idx < 5) {
        const nextInput = document.getElementById(`digit-${idx + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      showToast('Email verified successfully! Welcome to Dayflow.', 'success');
      navigate('/employee/dashboard');
    }, 1000);
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

        {/* Verification Card */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center">
            <Mail className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">
              Verify Your Work Email
            </h2>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              We dispatched a 6-digit security code to{' '}
              <strong className="text-surface-900 dark:text-white">{currentUser?.email || 'alex.rivera@dayflow.io'}</strong>
            </p>
          </div>

          {/* 6 Digit Inputs */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  id={`digit-${idx}`}
                  type="text"
                  maxLength={1}
                  value={code[idx]}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-black font-mono bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-2xl text-surface-900 dark:text-surface-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all"
                />
              ))}
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isVerifying}
              className="w-full font-bold shadow-glow-sm"
            >
              Verify Code & Enter Portal
            </Button>
          </form>

          <div className="flex items-center justify-between text-xs text-surface-500 dark:text-surface-400 pt-3 border-t border-surface-100 dark:border-surface-800 font-mono">
            <span>Didn't receive code?</span>
            <button
              onClick={() => showToast('New 6-digit verification code sent!', 'info')}
              className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}