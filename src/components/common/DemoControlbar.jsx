// src/components/common/DemoControlBar.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  User,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHrms } from '../../context/HrmsContext';
import { Button } from './Button';
import { Badge } from './Badge';

export function DemoControlBar() {
  const { currentUser, role, switchDemoRole, switchUser } = useAuth();
  const { resetDemoData, resetTodayAttendance, employees, pendingLeavesCount } = useHrms();
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isEmployee = role === 'employee';

  const handleRoleSwitch = (targetRole) => {
    switchDemoRole(targetRole);
    if (targetRole === 'HR/Admin' || targetRole === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/employee/dashboard');
    }
  };

  const demoSteps = [
    {
      num: '1',
      title: 'Smart Attendance',
      route: '/employee/attendance',
      actionRole: 'Employee',
      desc: 'GPS capture + Webcam face scan'
    },
    {
      num: '2',
      title: 'Attendance Heatmap',
      route: '/employee/attendance',
      actionRole: 'Employee',
      desc: '6-mo GitHub-style streak'
    },
    {
      num: '3',
      title: 'Apply Leave',
      route: '/employee/leave',
      actionRole: 'Employee',
      desc: 'Auto-calculated days counter'
    },
    {
      num: '4',
      title: 'HR Approval',
      route: '/admin/leaves',
      actionRole: 'HR/Admin',
      badge: pendingLeavesCount > 0 ? `${pendingLeavesCount} Pending` : null,
      desc: '1-click Approve with confetti'
    },
    {
      num: '5',
      title: 'Smart Insights',
      route: '/admin/insights',
      actionRole: 'HR/Admin',
      desc: 'Rule-based workforce patterns'
    },
    {
      num: '6',
      title: 'Auto Payslip',
      route: '/admin/payroll',
      actionRole: 'HR/Admin',
      desc: 'Instant jsPDF generator'
    }
  ];

  return (
    <aside aria-label="Hackathon Demo Live Controller" className="relative z-40 bg-gradient-to-r from-surface-900 via-brand-950 to-surface-900 text-white border-b border-brand-800/40 shadow-lg text-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Hackathon Badge & Role Switcher */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold uppercase tracking-wider text-[11px] text-brand-300 flex items-center gap-1 font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Dayflow Demo Mode
            </span>
          </div>

          <div className="h-4 w-px bg-surface-700 hidden sm:block" />

          {/* Quick Role Toggle Switch */}
          <div className="flex items-center bg-surface-800/80 p-0.5 rounded-xl border border-surface-700">
            <button
              onClick={() => handleRoleSwitch('Employee')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                isEmployee
                  ? 'bg-brand-600 text-white shadow-sm font-bold'
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Employee ({currentUser?.name?.split(' ')[0] || 'Alex'})</span>
            </button>

            <button
              onClick={() => handleRoleSwitch('HR/Admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                !isEmployee
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>HR Admin</span>
              {pendingLeavesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-surface-950 font-extrabold text-[9px] flex items-center justify-center">
                  {pendingLeavesCount}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-surface-400 hover:text-white p-1 rounded-lg md:hidden"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Center: Interactive Demo Story Flow Guide */}
        {isExpanded && (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
            <span className="text-[10px] text-surface-400 uppercase font-mono mr-1 hidden lg:inline">
              Pitch Flow:
            </span>
            {demoSteps.map((step) => {
              const isActive = location.pathname === step.route;
              return (
                <button
                  key={step.num}
                  onClick={() => {
                    if (step.actionRole === 'HR/Admin' && isEmployee) {
                      switchDemoRole('HR/Admin');
                    } else if (step.actionRole === 'Employee' && !isEmployee) {
                      switchDemoRole('Employee');
                    }
                    navigate(step.route);
                  }}
                  title={step.desc}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-500/30 border-brand-400 text-brand-200 font-bold shadow-sm'
                      : 'bg-surface-800/50 border-surface-700/60 text-surface-300 hover:bg-surface-700/60 hover:text-white'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-500/40 text-brand-300 font-mono text-[9px] flex items-center justify-center">
                    {step.num}
                  </span>
                  <span>{step.title}</span>
                  {step.badge && (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] px-1 rounded">
                      {step.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Right: Quick State Resets for judges */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={resetTodayAttendance}
            title="Reset today's check-in so you can demonstrate the live GPS check-in again"
            className="text-[11px] text-surface-400 hover:text-amber-300 hover:bg-surface-800 px-2 py-1 rounded-lg border border-surface-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Check-In</span>
          </button>

          <button
            onClick={resetDemoData}
            title="Reset mock database to initial showcase state"
            className="text-[11px] text-surface-400 hover:text-rose-300 hover:bg-surface-800 px-2 py-1 rounded-lg border border-surface-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo DB</span>
          </button>
        </div>
      </div>
    </aside>
  );
}