// src/pages/admin/AdminAttendance.jsx
import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  Search,
  Filter,
  Users,
  Eye
} from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export function AdminAttendance() {
  const { employees } = useHrms();
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-08-22');

  const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Sales', 'Product', 'People Ops'];
  const statuses = ['All', 'Present', 'Half Day', 'Leave', 'Absent'];

  // Generate today's attendance matrix for all employees
  const attendanceRoster = employees.map((emp, index) => {
    let status = 'Present';
    let checkIn = '09:05 AM';
    let checkOut = 'In Progress';
    let hours = '7h 12m';
    let location = 'San Francisco HQ (Verified)';

    if (emp.name === 'Priya Sharma') {
      status = 'Leave';
      checkIn = '--:--';
      checkOut = '--:--';
      hours = '0h';
      location = 'On Approved Sick Leave';
    } else if (emp.name === 'Michael Scott') {
      status = 'Half Day';
      checkIn = '09:15 AM';
      checkOut = '01:30 PM';
      hours = '4h 15m';
      location = 'New York Remote';
    } else if (index === 6) {
      status = 'Present';
      checkIn = '08:45 AM';
      checkOut = 'In Progress';
      hours = '7h 30m';
      location = 'San Francisco HQ';
    }

    return {
      id: emp.id,
      name: emp.name,
      avatar: emp.avatar,
      department: emp.department,
      designation: emp.designation,
      status,
      checkIn,
      checkOut,
      hours,
      location
    };
  });

  const filteredRoster = attendanceRoster.filter((item) => {
    const matchesDept = deptFilter === 'All' || item.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q);

    return matchesDept && matchesStatus && matchesSearch;
  });

  const counts = {
    total: attendanceRoster.length,
    present: attendanceRoster.filter((r) => r.status === 'Present').length,
    halfDay: attendanceRoster.filter((r) => r.status === 'Half Day').length,
    leave: attendanceRoster.filter((r) => r.status === 'Leave').length,
    absent: attendanceRoster.filter((r) => r.status === 'Absent').length,
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
            Workforce Attendance Management
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Monitor real-time company-wide presence, GPS perimeter logs, and shift durations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-mono font-bold text-surface-900 dark:text-white shadow-sm"
          />
        </div>
      </div>

      {/* Real-time Status Counters Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-sm">
          <span className="text-[10px] font-bold uppercase font-mono text-surface-400 block">Total Workforce</span>
          <span className="text-2xl font-black font-mono text-surface-900 dark:text-white">{counts.total}</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 shadow-sm">
          <span className="text-[10px] font-bold uppercase font-mono text-emerald-700 dark:text-emerald-400 block">Present Now</span>
          <span className="text-2xl font-black font-mono text-emerald-900 dark:text-emerald-200">{counts.present}</span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 shadow-sm">
          <span className="text-[10px] font-bold uppercase font-mono text-amber-700 dark:text-amber-400 block">Half-Day Shift</span>
          <span className="text-2xl font-black font-mono text-amber-900 dark:text-amber-200">{counts.halfDay}</span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/60 shadow-sm">
          <span className="text-[10px] font-bold uppercase font-mono text-sky-700 dark:text-sky-400 block">Approved Leave</span>
          <span className="text-2xl font-black font-mono text-sky-900 dark:text-sky-200">{counts.leave}</span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/60 shadow-sm">
          <span className="text-[10px] font-bold uppercase font-mono text-rose-700 dark:text-rose-400 block">Unplanned Absent</span>
          <span className="text-2xl font-black font-mono text-rose-900 dark:text-rose-200">{counts.absent}</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === s
                  ? 'bg-brand-600 text-white shadow-sm font-bold'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employee or location..."
            className="w-full pl-8 pr-3 py-1.5 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-1 focus:ring-brand-500 font-sans"
          />
        </div>
      </div>

      {/* Daily Attendance Roster Table */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-950/30 text-[11px] font-bold uppercase tracking-wider text-surface-400 font-mono">
                <th className="py-3.5 px-5">Employee</th>
                <th className="py-3.5 px-5">Department</th>
                <th className="py-3.5 px-5">Check In</th>
                <th className="py-3.5 px-5">Check Out</th>
                <th className="py-3.5 px-5">Working Hours</th>
                <th className="py-3.5 px-5">Perimeter / Location</th>
                <th className="py-3.5 px-5">Presence Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-100 dark:divide-surface-800/60">
              {filteredRoster.map((item) => (
                <tr key={item.id} className="hover:bg-surface-50/70 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <span className="font-bold text-surface-900 dark:text-white block">{item.name}</span>
                        <span className="text-[10px] text-surface-400 font-mono">{item.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5 font-medium text-surface-700 dark:text-surface-300">
                    {item.department}
                  </td>

                  <td className="py-4 px-5 font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    {item.checkIn}
                  </td>

                  <td className="py-4 px-5 font-mono text-surface-600 dark:text-surface-400">
                    {item.checkOut}
                  </td>

                  <td className="py-4 px-5 font-mono font-bold text-surface-900 dark:text-white">
                    {item.hours}
                  </td>

                  <td className="py-4 px-5 text-xs text-surface-500 dark:text-surface-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <StatusBadge status={item.status} />
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