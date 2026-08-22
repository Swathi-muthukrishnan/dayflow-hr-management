// src/components/attendance/SmartAttendanceCard.jsx
import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Camera,
  CheckCircle2,
  LogIn,
  LogOut,
  ShieldCheck,
  Zap,
  Globe,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { formatTimerSeconds, formatHoursDecimal } from '../../utils/attendanceUtils';
import { Button } from '../common/Button';
import { Badge, StatusBadge } from '../common/Badge';
import { CameraModal } from './CameraModal';

export function SmartAttendanceCard() {
  const {
    todayAttendance,
    workingSeconds,
    checkIn,
    checkOut,
    resetTodayAttendance
  } = useHrms();

  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const isNotCheckedIn = todayAttendance.status === 'not_checked_in' || !todayAttendance.status;
  const isWorking = todayAttendance.status === 'working';
  const isCheckedOut = todayAttendance.status === 'checked_out';

  const handleNormalCheckIn = async () => {
    setIsLoading(true);
    try {
      await checkIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaceCheckInSuccess = async () => {
    setIsLoading(true);
    try {
      await checkIn(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOutAction = async () => {
    setIsLoading(true);
    try {
      await checkOut();
    } finally {
      setIsLoading(false);
    }
  };

  const formattedTimer = formatTimerSeconds(workingSeconds);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-surface-200 dark:border-surface-800 bg-white/90 dark:bg-surface-900/90 p-6 sm:p-8 shadow-xl backdrop-blur-md">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-500/10 dark:bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent-500/10 dark:bg-accent-500/15 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Status & Telemetry Details */}
        <div className="space-y-4 max-w-xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-surface-400 font-mono">
              Today's Session
            </span>
            <StatusBadge status={isWorking ? 'working' : isCheckedOut ? 'present' : 'notcheckedin'} />

            {todayAttendance.faceVerified && (
              <Badge variant="purple" size="xs">
                <Camera className="w-3 h-3 text-purple-400" />
                Face Biometric Verified
              </Badge>
            )}

            {todayAttendance.location?.verified && (
              <Badge variant="success" size="xs">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                GPS Location Verified ✓
              </Badge>
            )}
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
              {isWorking
                ? 'Active Work Shift in Progress'
                : isCheckedOut
                ? 'Workday Completed & Synced'
                : 'Ready to Begin Your Workday'}
            </h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1 leading-relaxed">
              {isWorking
                ? 'Time tracking is live with continuous GPS perimeter heartbeat.'
                : isCheckedOut
                ? 'Your hours have been computed and appended to the monthly payroll registry.'
                : 'Authenticate your presence with high-precision geolocation and optical verification.'}
            </p>
          </div>

          {/* Location & Time Information Strip */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-surface-600 dark:text-surface-400 pt-1">
            <div className="flex items-center gap-1.5 bg-surface-100 dark:bg-surface-800/80 px-3 py-1.5 rounded-xl border border-surface-200 dark:border-surface-700/60 font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>
                {todayAttendance.location?.address || 'San Francisco Innovation HQ (100 Mission St)'}
              </span>
            </div>

            {todayAttendance.checkInTime && (
              <div className="flex items-center gap-1.5 bg-surface-100 dark:bg-surface-800/80 px-3 py-1.5 rounded-xl border border-surface-200 dark:border-surface-700/60 font-mono">
                <LogIn className="w-3.5 h-3.5 text-emerald-500" />
                <span>In: {todayAttendance.checkInTime}</span>
              </div>
            )}

            {todayAttendance.checkOutTime && (
              <div className="flex items-center gap-1.5 bg-surface-100 dark:bg-surface-800/80 px-3 py-1.5 rounded-xl border border-surface-200 dark:border-surface-700/60 font-mono">
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Out: {todayAttendance.checkOutTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Working Timer & Main Action Buttons */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 lg:border-l border-surface-200 dark:border-surface-800 pt-4 lg:pt-0 lg:pl-8">
          {/* Live Timer Counter */}
          <div className="text-left lg:text-right space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-surface-400 font-mono flex items-center lg:justify-end gap-1.5">
              {isWorking && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
              {isWorking ? 'WORKING DURATION' : isCheckedOut ? 'TOTAL DURATION' : 'DURATION'}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-surface-900 dark:text-white tracking-tight">
              {isWorking ? formattedTimer : isCheckedOut ? formatHoursDecimal(todayAttendance.finalHours || (workingSeconds / 3600)) : '00:00:00'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {isNotCheckedIn && (
              <>
                <Button
                  variant="gradient"
                  size="lg"
                  icon={Zap}
                  isLoading={isLoading}
                  onClick={handleNormalCheckIn}
                  className="font-bold shadow-glow-sm py-3 px-6 text-sm flex-1 sm:flex-initial"
                >
                  CHECK IN
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  icon={Camera}
                  onClick={() => setIsCameraOpen(true)}
                  className="text-xs sm:text-sm font-semibold border-brand-500/30 text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950/50"
                  title="Smart Biometric Face Verification"
                >
                  Face Scan
                </Button>
              </>
            )}

            {isWorking && (
              <Button
                variant="danger"
                size="lg"
                icon={LogOut}
                isLoading={isLoading}
                onClick={handleCheckOutAction}
                className="font-bold shadow-lg shadow-rose-950/20 py-3 px-6 text-sm flex-1 sm:flex-initial"
              >
                CHECK OUT
              </Button>
            )}

            {isCheckedOut && (
              <div className="flex items-center gap-2">
                <Badge variant="success" size="lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Day Completed
                </Badge>
                <button
                  onClick={resetTodayAttendance}
                  title="Reset today's attendance to test check-in again"
                  className="p-2 rounded-xl text-surface-400 hover:text-brand-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Biometric Face Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onVerified={handleFaceCheckInSuccess}
      />
    </div>
  );
}