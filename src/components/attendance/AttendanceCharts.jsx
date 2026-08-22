// src/components/attendance/AttendanceCharts.jsx
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { BarChart3, TrendingUp, Clock, Filter } from 'lucide-react';
import { Badge } from '../common/Badge';

const weeklyData = [
  { day: 'Mon', hours: 8.4, present: 1, halfDay: 0, leave: 0, absent: 0 },
  { day: 'Tue', hours: 8.8, present: 1, halfDay: 0, leave: 0, absent: 0 },
  { day: 'Wed', hours: 7.9, present: 1, halfDay: 0, leave: 0, absent: 0 },
  { day: 'Thu', hours: 9.1, present: 1, halfDay: 0, leave: 0, absent: 0 },
  { day: 'Fri', hours: 8.2, present: 1, halfDay: 0, leave: 0, absent: 0 },
  { day: 'Sat', hours: 0, present: 0, halfDay: 0, leave: 0, absent: 0 },
  { day: 'Sun', hours: 0, present: 0, halfDay: 0, leave: 0, absent: 0 },
];

const monthlyData = [
  { name: 'Week 1', present: 5, halfDay: 0, leave: 0, hours: 41.5 },
  { name: 'Week 2', present: 4, halfDay: 1, leave: 0, hours: 38.2 },
  { name: 'Week 3', present: 4, halfDay: 0, leave: 1, hours: 33.0 },
  { name: 'Week 4', present: 5, halfDay: 0, leave: 0, hours: 42.4 },
];

const threeMonthsData = [
  { name: 'June', rate: 96, avgHours: 8.4, leaves: 1 },
  { name: 'July', rate: 92, avgHours: 8.1, leaves: 2 },
  { name: 'August', rate: 94, avgHours: 8.5, leaves: 1 },
];

export function AttendanceCharts() {
  const [filter, setFilter] = useState('This Week'); // 'This Week' | 'This Month' | 'Last 3 Months'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Working Hours & Efficiency */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-surface-100 dark:border-surface-800">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-500" />
              <h4 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Daily Working Hours Track
              </h4>
            </div>
            <p className="text-xs text-surface-400">Logged duration against standard 8.0h threshold</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 p-1 rounded-xl">
            {['This Week', 'This Month', 'Last 3 Months'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filter === f
                    ? 'bg-white dark:bg-surface-900 text-brand-600 dark:text-brand-400 shadow-sm font-bold'
                    : 'text-surface-500 hover:text-surface-900 dark:hover:text-surface-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filter === 'This Week' ? weeklyData : filter === 'This Month' ? monthlyData : threeMonthsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
              <XAxis
                dataKey={filter === 'This Week' ? 'day' : 'name'}
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                domain={[0, 10]}
                unit="h"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <ReferenceLine y={8.0} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: '8h Target', fill: '#f59e0b', fontSize: 10 }} />
              <Line
                type="monotone"
                dataKey={filter === 'Last 3 Months' ? 'avgHours' : 'hours'}
                name="Hours Worked"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#6366f1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-800 text-xs text-surface-400">
          <span>Weekly Target: 40.0h</span>
          <span className="font-bold text-emerald-500">42.4h Logged (+6% Punctuality)</span>
        </div>
      </div>

      {/* Chart 2: Attendance Consistency Distribution */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between pb-4 border-b border-surface-100 dark:border-surface-800">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <h4 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Attendance Consistency
              </h4>
            </div>
            <p className="text-xs text-surface-400">Distribution of present vs half-day vs leave days</p>
          </div>

          <Badge variant="success" size="xs">
            94% On-Track
          </Badge>
        </div>

        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="present" name="Present Days" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="halfDay" name="Half Days" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="leave" name="Approved Leaves" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-800 text-xs text-surface-400">
          <span>Total Working Days: 22</span>
          <span className="font-bold text-brand-500">Zero Unplanned Absences</span>
        </div>
      </div>
    </div>
  );
}