// src/pages/admin/AdminReports.jsx
import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Percent,
  TrendingUp,
  CreditCard,
  Building,
  Users,
  FileSpreadsheet
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useHrms } from '../../context/HrmsContext';
import { formatCurrency } from '../../utils/payrollUtils';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

const monthlyAttendanceTrend = [
  { month: 'Jan', rate: 94.2 },
  { month: 'Feb', rate: 95.8 },
  { month: 'Mar', rate: 93.1 },
  { month: 'Apr', rate: 96.4 },
  { month: 'May', rate: 94.9 },
  { month: 'Jun', rate: 97.2 },
  { month: 'Jul', rate: 93.5 },
  { month: 'Aug', rate: 95.4 },
];

const leaveDistribution = [
  { name: 'Paid Annual Leave', value: 45, color: '#4f46e5' },
  { name: 'Sick & Medical Leave', value: 28, color: '#10b981' },
  { name: 'Casual & Personal', value: 18, color: '#f59e0b' },
  { name: 'Unpaid / Sabbatical', value: 9, color: '#0ea5e9' },
];

const deptAttendanceData = [
  { dept: 'Engineering', rate: 96.8 },
  { dept: 'Design', rate: 98.4 },
  { dept: 'Marketing', rate: 92.1 },
  { dept: 'Sales', rate: 89.6 },
  { dept: 'Product', rate: 95.2 },
  { dept: 'People Ops', rate: 99.1 },
];

export function AdminReports() {
  const { employees, showToast } = useHrms();
  const [timeRange, setTimeRange] = useState('This Month');

  const totalPayroll = employees.reduce((sum, e) => sum + (e.salary?.netSalary || 8350), 0);

  const handleExportCsv = () => {
    showToast('Executive Workforce Analytics exported to CSV successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
            Workforce Reports & Executive Analytics
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Holistic cross-departmental intelligence covering punctuality, PTO utilization, and payroll trends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Range Switcher */}
          <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 p-1 rounded-xl">
            {['This Month', 'Q3 2026', 'YTD'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === t
                    ? 'bg-white dark:bg-surface-900 text-brand-600 dark:text-brand-400 shadow-sm font-bold'
                    : 'text-surface-500 hover:text-surface-900 dark:hover:text-surface-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={FileSpreadsheet}
            onClick={handleExportCsv}
            className="text-xs font-bold"
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Headcount"
          value={`${employees.length}`}
          subtitle="Across 6 business units"
          icon={Users}
          color="brand"
        />
        <StatCard
          title="Avg Attendance Rate"
          value="95.4%"
          subtitle="+1.8% vs last quarter"
          icon={Percent}
          color="emerald"
          trend="+1.8%"
          trendPositive={true}
        />
        <StatCard
          title="PTO Utilization Rate"
          value="4.2%"
          subtitle="Within healthy threshold"
          icon={Calendar}
          color="amber"
        />
        <StatCard
          title="Monthly Payroll Cost"
          value={formatCurrency(totalPayroll)}
          subtitle="Net monthly disbursement"
          icon={CreditCard}
          color="sky"
        />
      </div>

      {/* Charts Grid: 2x2 Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Monthly Attendance Rate (Line Chart) */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Monthly Attendance Rate History
              </h3>
              <p className="text-xs text-surface-400">8-month presence benchmark trendline</p>
            </div>
            <Badge variant="success" size="xs">95.4% Benchmark</Badge>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAttendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[90, 100]} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="rate" name="Attendance %" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Leave Distribution (Donut Chart) */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Leave Type Breakdown & Distribution
              </h3>
              <p className="text-xs text-surface-400">Proportional category distribution of taken PTO</p>
            </div>
            <Badge variant="primary" size="xs">100% Normalized</Badge>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {leaveDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => `${val}%`}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Department Attendance Rate (Bar Chart) */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Departmental Attendance Rates
              </h3>
              <p className="text-xs text-surface-400">Punctuality index per business department</p>
            </div>
            <Badge variant="success" size="xs">Design Lead (98.4%)</Badge>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="dept" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[80, 100]} unit="%" />
                <Tooltip
                  formatter={(val) => `${val}%`}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="rate" name="Attendance %" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Executive Compliance Summary */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-gradient-to-br from-brand-950 via-surface-900 to-brand-950 text-white p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <Badge variant="primary" size="xs">Executive Summary</Badge>
            <h3 className="text-xl font-bold">Q3 2026 Workforce Audit</h3>
            <p className="text-xs text-surface-300 leading-relaxed">
              All 8 registered employees maintain active smart attendance records with GPS perimeter check-in compliance. Zero unresolved leave disputes logged in the current audit period.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-brand-800/60 grid grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase text-brand-300 block">Payroll Accuracy</span>
              <span className="font-bold text-lg text-emerald-400">99.98%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-brand-300 block">On-Time Approvals</span>
              <span className="font-bold text-lg text-brand-300">&lt; 4 Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
