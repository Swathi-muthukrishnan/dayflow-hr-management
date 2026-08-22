// src/components/attendance/AttendanceHeatmap.jsx
import React, { useState } from 'react';
import { Flame, Trophy, Percent, Calendar, Info } from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { Badge } from '../common/Badge';

export function AttendanceHeatmap() {
  const { heatmapDays, attendanceMetrics } = useHrms();
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const getTileColor = (day) => {
    switch (day.status) {
      case 'present':
        if (day.hours >= 8) return 'bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-500';
        return 'bg-emerald-400/80 hover:bg-emerald-400 dark:bg-emerald-600';
      case 'half_day':
        return 'bg-amber-400 hover:bg-amber-300 dark:bg-amber-500';
      case 'leave':
        return 'bg-sky-400 hover:bg-sky-300 dark:bg-sky-500';
      case 'absent':
        return 'bg-rose-500 hover:bg-rose-400 dark:bg-rose-600';
      case 'weekend':
      default:
        return 'bg-surface-200 hover:bg-surface-300 dark:bg-surface-800 dark:hover:bg-surface-700 opacity-60';
    }
  };

  const handleMouseEnter = (day, e) => {
    const rect = e.target.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 8
    });
    setHoveredDay(day);
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  // Group days into columns of 7 (weeks)
  const weeks = [];
  for (let i = 0; i < heatmapDays.length; i += 7) {
    weeks.push(heatmapDays.slice(i, i + 7));
  }

  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="relative rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-7 shadow-sm">
      {/* Top Header with Highlighted Streak Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-surface-100 dark:border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-500" />
            <h3 className="text-lg font-bold text-surface-900 dark:text-white">
              Workforce Attendance Heatmap
            </h3>
            <Badge variant="primary" size="xs">
              6-Month Rolling Log
            </Badge>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
            GitHub-style daily presence distribution, streaks, and punctuality consistency.
          </p>
        </div>

        {/* 3 Metric Pills */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Current Streak */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/70 dark:border-amber-800/70">
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <div>
              <span className="text-[10px] uppercase font-mono block text-amber-700 dark:text-amber-400 font-bold leading-none">
                Current Streak
              </span>
              <span className="text-sm font-extrabold text-amber-900 dark:text-amber-200 font-mono">
                {attendanceMetrics.currentStreak} Days
              </span>
            </div>
          </div>

          {/* Best Streak */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800/70">
            <Trophy className="w-4 h-4 text-purple-500" />
            <div>
              <span className="text-[10px] uppercase font-mono block text-purple-700 dark:text-purple-400 font-bold leading-none">
                Best Streak
              </span>
              <span className="text-sm font-extrabold text-purple-900 dark:text-purple-200 font-mono">
                {attendanceMetrics.bestStreak} Days
              </span>
            </div>
          </div>

          {/* Attendance Rate */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/70">
            <Percent className="w-4 h-4 text-emerald-500" />
            <div>
              <span className="text-[10px] uppercase font-mono block text-emerald-700 dark:text-emerald-400 font-bold leading-none">
                Attendance Rate
              </span>
              <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200 font-mono">
                {attendanceMetrics.attendanceRate}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Viewport */}
      <div className="mt-6 overflow-x-auto pb-2">
        <div className="min-w-[720px]">
          {/* Months Header Labels */}
          <div className="flex justify-between pl-8 pr-2 mb-2 text-[11px] font-mono text-surface-400 font-semibold">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {/* Grid Rows (7 rows: Sun - Sat) */}
          <div className="flex gap-1.5">
            {/* Day Labels Column */}
            <div className="flex flex-col justify-between py-0.5 text-[10px] font-mono text-surface-400 w-6 shrink-0 select-none">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Weeks Columns */}
            <div className="flex gap-1.5 flex-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5 flex-1">
                  {week.map((day, dIdx) => (
                    <div
                      key={day.date || `${wIdx}-${dIdx}`}
                      onMouseEnter={(e) => handleMouseEnter(day, e)}
                      onMouseLeave={handleMouseLeave}
                      className={`h-3.5 sm:h-4 rounded-md transition-all duration-150 cursor-pointer ${getTileColor(day)} ${
                        day.isToday ? 'ring-2 ring-brand-500 ring-offset-1 dark:ring-offset-surface-900' : ''
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend & Summary Info */}
      <div className="mt-6 pt-4 border-t border-surface-100 dark:border-surface-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400">
          <Info className="w-3.5 h-3.5" />
          <span>Showing {heatmapDays.length} days of tracked presence. Hover over any tile to inspect daily timestamps.</span>
        </div>

        {/* Legend Chips */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-surface-600 dark:text-surface-400">
          <span className="text-surface-400">Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-surface-200 dark:bg-surface-800" />
            <span>Weekend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500" />
            <span>Absent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-sky-400" />
            <span>Leave</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400" />
            <span>Half Day</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500" />
            <span>Present</span>
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            zIndex: 100
          }}
          className="bg-surface-950/95 text-white text-xs px-3 py-2 rounded-xl shadow-2xl border border-surface-700 whitespace-nowrap animate-fadeIn backdrop-blur-md"
        >
          <div className="font-bold flex items-center gap-2">
            <span>
              {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="uppercase text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/20">
              {hoveredDay.status}
            </span>
          </div>
          {hoveredDay.status !== 'weekend' && hoveredDay.status !== 'absent' && (
            <div className="text-[11px] text-surface-300 font-mono mt-1">
              Logged: {hoveredDay.hours}h • {hoveredDay.checkIn} to {hoveredDay.checkOut}
            </div>
          )}
        </div>
      )}
    </div>
  );
}