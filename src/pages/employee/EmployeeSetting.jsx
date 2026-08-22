// src/pages/employee/EmployeeSettings.jsx
import React, { useState } from 'react';
import { Settings, Moon, Sun, Bell, Lock, Shield, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useHrms } from '../../context/HrmsContext';
import { Button } from '../../components/common/Button';

export function EmployeeSettings() {
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useHrms();

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [attendanceReminders, setAttendanceReminders] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Please fill in password fields.', 'error');
      return;
    }
    showToast('Password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800">
        <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
          Account & Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
          Manage interface theme, notification channels, and security credentials.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Appearance & Theme */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-surface-900 dark:text-white">
                Interface Appearance
              </h3>
              <p className="text-xs text-surface-400">
                Choose between clean light mode or high-contrast dark theme.
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs font-bold text-surface-900 dark:text-white transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>
        </div>

        {/* Section 2: Notification Channels */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-surface-900 dark:text-white">
            Notification Preferences
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 cursor-pointer">
              <div>
                <span className="font-bold text-xs sm:text-sm text-surface-900 dark:text-white block">
                  Email Dispatch for Leave Approvals
                </span>
                <span className="text-[11px] text-surface-400">
                  Receive instant notifications when HR approves or declines your time off
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => {
                  setEmailNotifs(e.target.checked);
                  showToast('Notification preference saved.', 'info');
                }}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 cursor-pointer">
              <div>
                <span className="font-bold text-xs sm:text-sm text-surface-900 dark:text-white block">
                  Daily Clock-in Reminder
                </span>
                <span className="text-[11px] text-surface-400">
                  Receive morning nudge at 09:00 AM if smart check-in has not been performed
                </span>
              </div>
              <input
                type="checkbox"
                checked={attendanceReminders}
                onChange={(e) => {
                  setAttendanceReminders(e.target.checked);
                  showToast('Attendance reminder preference saved.', 'info');
                }}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </label>
          </div>
        </div>

        {/* Section 3: Security & Password */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-surface-900 dark:text-white">
            Security Credentials
          </h3>

          <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 font-mono mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 font-mono mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
              />
            </div>

            <Button variant="primary" size="sm" type="submit" icon={Check} className="font-bold">
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}