// src/pages/employee/EmployeeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  Percent,
  CheckCircle2,
  CalendarDays,
  FileText,
  Download,
  ArrowUpRight,
  Sparkles,
  Zap,
  ChevronRight,
  HeartPulse,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHrms } from '../../context/HrmsContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { companyHolidays } from '../../services/mockHrmsData';
import { formatCurrency } from '../../utils/payrollUtils';
import { ApplyLeaveModal } from '../../components/leave/ApplyLeaveModal';
import { formatTimerSeconds } from '../../utils/attendanceUtils';

export function EmployeeDashboard() {
  const { currentUser } = useAuth();
  const {
    todayAttendance,
    workingSeconds,
    checkIn,
    checkOut,
    leaveRequests,
    attendanceMetrics,
    generatePayslipPdfAction
  } = useHrms();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [currentClock, setCurrentClock] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isWorking = todayAttendance.status === 'working';
  const isCheckedOut = todayAttendance.status === 'checked_out';
  const isNotCheckedIn = !todayAttendance.status || todayAttendance.status === 'not_checked_in';

  const userLeaves = leaveRequests.filter((r) => r.employeeId === (currentUser?.id || 'DF-1001'));
  const pendingLeaves = userLeaves.filter((r) => r.status === 'Pending');

  const formattedDateLong = currentClock.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = currentClock.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
              Good morning, {currentUser?.name?.split(' ')[0] || 'Alex'} 👋
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-1">
            {formattedDateLong} • {currentUser?.designation} ({currentUser?.department})
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={CalendarDays}
            onClick={() => setIsApplyModalOpen(true)}
            className="text-xs font-bold"
          >
            Apply Leave
          </Button>

          <Button
            variant="gradient"
            size="sm"
            icon={Zap}
            onClick={() => navigate('/employee/attendance')}
            className="text-xs font-bold shadow-glow-sm"
          >
            Smart Attendance
          </Button>
        </div>
      </div>

      {/* 4 Animated KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Monthly Attendance"
          value={`${attendanceMetrics.attendanceRate}%`}
          subtitle="96% on-time benchmark"
          icon={Percent}
          color="emerald"
          trend="+2.4%"
          trendPositive={true}
          onClick={() => navigate('/employee/attendance')}
        />

        <StatCard
          title="Present Days"
          value={`${attendanceMetrics.presentDays} / 22`}
          subtitle="Full working shifts"
          icon={CheckCircle2}
          color="brand"
          trend="8-Day Streak"
          trendPositive={true}
          onClick={() => navigate('/employee/attendance')}
        />

        <StatCard
          title="Paid Leave Balance"
          value={`${currentUser?.leaveBalance?.paid || 12} Days`}
          subtitle="Available for time-off"
          icon={Calendar}
          color="amber"
          onClick={() => navigate('/employee/leave')}
        />

        <StatCard
          title="Pending Requests"
          value={`${pendingLeaves.length}`}
          subtitle={pendingLeaves.length > 0 ? 'Awaiting HR review' : 'All requests resolved'}
          icon={Clock}
          color="sky"
          onClick={() => navigate('/employee/leave')}
        />
      </div>

      {/* Main Grid: Today's Shift Status + Quick Payslip Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Attendance Action Card (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-surface-400 font-mono">
                  Today's Live Clock
                </span>
                <StatusBadge status={isWorking ? 'working' : isCheckedOut ? 'present' : 'notcheckedin'} />
              </div>
              <span className="text-xs font-mono text-surface-400 font-medium">
                {formattedTime}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-surface-900 dark:text-white">
                  {isWorking
                    ? 'You are currently clocked in'
                    : isCheckedOut
                    ? 'Shift complete for today'
                    : 'You have not checked in yet today'}
                </h3>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                  {isWorking
                    ? `Session started at ${todayAttendance.checkInTime} • Geolocation verified.`
                    : isCheckedOut
                    ? `Total session duration: ${Math.floor(workingSeconds / 3600)}h ${Math.floor((workingSeconds % 3600) / 60)}m.`
                    : 'Click below to verify your GPS location and start tracking your workday.'}
                </p>
              </div>

              {/* Working Duration Display */}
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-mono text-surface-400 block font-bold">
                  Working Duration
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-brand-600 dark:text-brand-400">
                  {formatTimerSeconds(workingSeconds)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-surface-100 dark:border-surface-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-surface-500 dark:text-surface-400 font-mono">
              <span>Shift Target: <strong>8.0 Hours</strong></span>
              <span>•</span>
              <span>Network: <strong>San Francisco HQ</strong></span>
            </div>

            <div className="flex items-center gap-2">
              {isNotCheckedIn && (
                <Button
                  variant="gradient"
                  size="sm"
                  icon={Zap}
                  onClick={() => checkIn(false)}
                  className="font-bold shadow-glow-sm"
                >
                  Quick Check In
                </Button>
              )}

              {isWorking && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => checkOut()}
                  className="font-bold shadow-sm"
                >
                  Clock Out
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/employee/attendance')}
                className="text-xs"
              >
                View Full Heatmap →
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Latest Payslip & Compensation Quick Card (1 col) */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-gradient-to-br from-brand-950/80 via-surface-900 to-brand-950/80 text-white p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-300 font-mono">
                Latest Compensation
              </span>
              <Badge variant="success" size="xs">
                Processed
              </Badge>
            </div>

            <div>
              <span className="text-xs text-surface-400 font-mono">August 2026 Net Salary</span>
              <div className="text-3xl font-black font-mono text-white mt-1">
                {formatCurrency(currentUser?.salary?.netSalary || 8350)}
              </div>
              <p className="text-[11px] text-surface-300 mt-1">
                Disbursed to Bank Account •••• 4912
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-800/60 flex items-center justify-between gap-2">
            <button
              onClick={() => navigate('/employee/payroll')}
              className="text-xs text-brand-300 hover:text-white font-semibold hover:underline"
            >
              View Breakdown
            </button>

            <Button
              variant="gradient"
              size="sm"
              icon={Download}
              onClick={() => generatePayslipPdfAction(currentUser, 'August 2026')}
              className="text-xs font-bold"
            >
              PDF Payslip
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Leave Requests + Company Holidays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leave Requests (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-brand-500" />
              <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Recent Time-Off Applications
              </h3>
            </div>
            <button
              onClick={() => navigate('/employee/leave')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              View all ({userLeaves.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {userLeaves.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-surface-900 dark:text-white">{req.type}</span>
                    <span className="text-[10px] text-surface-400 font-mono">({req.days} Days)</span>
                  </div>
                  <span className="text-[11px] text-surface-500 dark:text-surface-400 font-mono mt-0.5 block">
                    {req.from} → {req.to}
                  </span>
                </div>

                <StatusBadge status={req.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Holidays (1 col) */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Upcoming Holidays
              </h3>
            </div>
            <Badge variant="warning" size="xs">
              2026 Calendar
            </Badge>
          </div>

          <div className="space-y-2.5">
            {companyHolidays.slice(0, 3).map((h) => (
              <div
                key={h.name}
                className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-surface-900 dark:text-white block">{h.name}</span>
                  <span className="text-[10px] text-surface-400 font-mono">{h.date}</span>
                </div>
                <Badge variant="default" size="xs">{h.days}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      <ApplyLeaveModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}