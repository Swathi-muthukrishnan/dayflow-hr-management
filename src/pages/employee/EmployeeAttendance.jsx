// src/pages/employee/EmployeeAttendance.jsx
import React, { useState } from 'react';
import { Clock, Calendar, ShieldCheck, MapPin, Filter, Search } from 'lucide-react';
import { SmartAttendanceCard } from '../../components/attendance/SmartAttendanceCard';
import { AttendanceHeatmap } from '../../components/attendance/AttendanceHeatmap';
import { AttendanceCharts } from '../../components/attendance/AttendanceCharts';
import { useHrms } from '../../context/HrmsContext';
import { StatusBadge } from '../../components/common/Badge';

export function EmployeeAttendance() {
  const { attendanceRecords } = useHrms();
  const [filterPeriod, setFilterPeriod] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample static log rows if attendance records is short
  const sampleLogs = [
    { date: '2026-08-22', checkIn: '09:05 AM', checkOut: '05:45 PM', hours: 8.7, status: 'present', location: 'San Francisco HQ' },
    { date: '2026-08-21', checkIn: '09:12 AM', checkOut: '05:30 PM', hours: 8.3, status: 'present', location: 'San Francisco HQ' },
    { date: '2026-08-20', checkIn: '09:00 AM', checkOut: '05:40 PM', hours: 8.6, status: 'present', location: 'San Francisco HQ' },
    { date: '2026-08-19', checkIn: '09:15 AM', checkOut: '01:30 PM', hours: 4.2, status: 'half_day', location: 'Remote / Home' },
    { date: '2026-08-18', checkIn: '08:55 AM', checkOut: '05:45 PM', hours: 8.8, status: 'present', location: 'San Francisco HQ' },
  ];

  const displayLogs = attendanceRecords.length > 0 ? [...attendanceRecords, ...sampleLogs] : sampleLogs;

  const filteredLogs = displayLogs.filter((log) => {
    const q = searchQuery.toLowerCase();
    return !q || log.date?.includes(q) || log.location?.toLowerCase().includes(q) || log.status?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8">
      {/* Top Page Title */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
            Smart Attendance & Heatmap
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Real-time biometric & GPS presence check, 6-month historical GitHub heatmap, and analytics.
          </p>
        </div>
      </div>

      {/* 1. Innovation Feature #1: Smart Attendance Action Card */}
      <SmartAttendanceCard />

      {/* 2. Innovation Feature #4: Attendance Heatmap */}
      <AttendanceHeatmap />

      {/* 3. Recharts Analytics */}
      <AttendanceCharts />

      {/* 4. Recent Daily Attendance Log Table */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-surface-100 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
              Daily Attendance Audit Logs
            </h4>
            <p className="text-xs text-surface-400">Chronological timestamp history with network location validation</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search date or location..."
              className="w-full pl-8 pr-3 py-1.5 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-950/30 text-[11px] font-bold uppercase tracking-wider text-surface-400 font-mono">
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Check In</th>
                <th className="py-3.5 px-5">Check Out</th>
                <th className="py-3.5 px-5">Working Hours</th>
                <th className="py-3.5 px-5">Verified Location</th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-100 dark:divide-surface-800/60 font-mono">
              {filteredLogs.map((log, idx) => (
                <tr key={`${log.date}-${idx}`} className="hover:bg-surface-50/70 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-surface-900 dark:text-white">
                    {log.date}
                  </td>
                  <td className="py-3.5 px-5 text-emerald-600 dark:text-emerald-400">
                    {log.checkIn}
                  </td>
                  <td className="py-3.5 px-5 text-rose-600 dark:text-rose-400">
                    {log.checkOut}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-surface-900 dark:text-white">
                    {log.hours}h
                  </td>
                  <td className="py-3.5 px-5 text-surface-600 dark:text-surface-400 font-sans text-xs">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                      <span>{log.location}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <StatusBadge status={log.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}