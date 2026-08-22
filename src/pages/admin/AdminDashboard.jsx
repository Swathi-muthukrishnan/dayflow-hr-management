// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  CalendarDays,
  CreditCard,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckSquare,
  AlertTriangle,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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
import { StatCard } from '../../components/common/StatCard';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { RejectCommentModal } from '../../components/hr/RejectCommentModal';

const attendanceTrend = [
  { day: 'Mon', present: 96, expected: 100 },
  { day: 'Tue', present: 98, expected: 100 },
  { day: 'Wed', present: 92, expected: 100 },
  { day: 'Thu', present: 95, expected: 100 },
  { day: 'Fri', present: 90, expected: 100 },
];

const departmentDist = [
  { name: 'Engineering', count: 3, fill: '#4f46e5' },
  { name: 'Design', count: 1, fill: '#10b981' },
  { name: 'Marketing', count: 1, fill: '#f59e0b' },
  { name: 'Sales', count: 1, fill: '#0ea5e9' },
  { name: 'Product', count: 1, fill: '#8b5cf6' },
  { name: 'People Ops', count: 1, fill: '#ec4899' },
];

export function AdminDashboard() {
  const {
    employees,
    leaveRequests,
    pendingLeavesCount,
    approveLeave,
    rejectLeave,
    smartInsights
  } = useHrms();

  const [rejectingRequest, setRejectingRequest] = useState(null);
  const navigate = useNavigate();

  const totalEmployees = employees.length;
  const pendingRequests = leaveRequests.filter((r) => r.status === 'Pending');

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-surface-200 dark:border-surface-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
            Executive HR Command Center 👋
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-1">
            Real-time workforce attendance telemetry, pending approvals, and AI-assisted leave patterns.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={() => navigate('/admin/insights')}
            className="text-xs font-bold text-brand-600 dark:text-brand-400"
          >
            ✨ Smart Insights
          </Button>

          <Button
            variant="gradient"
            size="sm"
            icon={CheckSquare}
            onClick={() => navigate('/admin/leaves')}
            className="text-xs font-bold shadow-glow-sm"
          >
            Review Approvals ({pendingLeavesCount})
          </Button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Workforce"
          value={`${totalEmployees}`}
          subtitle="Active on payroll"
          icon={Users}
          color="brand"
          trend="+12% Q3"
          trendPositive={true}
          onClick={() => navigate('/admin/employees')}
        />

        <StatCard
          title="Present Today"
          value={`${totalEmployees - 1} / ${totalEmployees}`}
          subtitle="96.2% workforce active"
          icon={CheckCircle2}
          color="emerald"
          trend="GPS Verified"
          trendPositive={true}
          onClick={() => navigate('/admin/attendance')}
        />

        <StatCard
          title="On Scheduled Leave"
          value="1"
          subtitle="Priya Sharma (Sick Leave)"
          icon={CalendarDays}
          color="amber"
          onClick={() => navigate('/admin/attendance')}
        />

        <StatCard
          title="Pending Approvals"
          value={`${pendingLeavesCount}`}
          subtitle={pendingLeavesCount > 0 ? 'Requires immediate action' : 'Queue clear'}
          icon={Clock}
          color="rose"
          onClick={() => navigate('/admin/leaves')}
        />
      </div>

      {/* Recharts Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend Area Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Workforce Weekly Presence Trend
              </h3>
              <p className="text-xs text-surface-400">Daily presence % vs company baseline (100%)</p>
            </div>
            <Badge variant="success" size="xs">94.2% Avg</Badge>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[80, 100]} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="present" name="Attendance %" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorPresent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution (1 col) */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Department Headcount
              </h3>
              <p className="text-xs text-surface-400">Total team distribution</p>
            </div>
            <Badge variant="primary" size="xs">{totalEmployees} Total</Badge>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentDist} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" name="Employees" radius={[0, 4, 4, 0]}>
                  {departmentDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pending Leave Requests Action Console */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-brand-500" />
            <div>
              <h3 className="font-bold text-base text-surface-900 dark:text-white">
                Pending Leave Approvals Queue
              </h3>
              <p className="text-xs text-surface-400">One-click immediate approval or decline with justification feedback</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/leaves')}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            View Full Approvals Hub <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center text-surface-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-surface-700 dark:text-surface-300">All leave requests have been reviewed!</p>
            <p>New applications from employees will populate here automatically.</p>
          </div>
        ) : (
          <div className="divide-y divide-surface-100 dark:divide-surface-800">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={req.avatar}
                    alt={req.employeeName}
                    className="w-10 h-10 rounded-2xl object-cover border border-surface-200 dark:border-surface-700 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-surface-900 dark:text-white">{req.employeeName}</span>
                      <Badge variant="primary" size="xs">{req.department}</Badge>
                      <Badge variant="warning" size="xs">{req.type}</Badge>
                    </div>
                    <p className="text-xs text-surface-600 dark:text-surface-400 font-mono mt-0.5">
                      Dates: <strong>{req.from} → {req.to}</strong> ({req.days} {req.days === 1 ? 'Day' : 'Days'})
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400 italic mt-1 max-w-lg">
                      "{req.remarks}"
                    </p>
                  </div>
                </div>

                {/* Approve & Reject Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Button
                    variant="danger"
                    size="sm"
                    icon={XCircle}
                    onClick={() => setRejectingRequest(req)}
                    className="text-xs font-bold"
                  >
                    Reject
                  </Button>

                  <Button
                    variant="accent"
                    size="sm"
                    icon={CheckCircle2}
                    onClick={() => approveLeave(req.id, 'Approved by HR Operations.')}
                    className="text-xs font-bold shadow-glow-emerald"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Smart Workforce Leave Insights Highlights */}
      <div className="rounded-3xl border border-brand-200/60 dark:border-brand-800/60 bg-gradient-to-r from-brand-950/40 via-surface-900 to-brand-950/40 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className="font-bold text-base text-white">
              Workforce Pattern Intelligence Alerts
            </h3>
          </div>
          <button
            onClick={() => navigate('/admin/insights')}
            className="text-xs font-bold text-brand-300 hover:underline"
          >
            View All AI Insights ({smartInsights.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {smartInsights.slice(0, 2).map((ins) => (
            <div
              key={ins.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{ins.title}</span>
                <Badge variant={ins.severity === 'High' ? 'danger' : 'warning'} size="xs">
                  {ins.severity}
                </Badge>
              </div>
              <p className="text-surface-300">{ins.pattern}</p>
              <div className="p-2.5 rounded-xl bg-brand-950/80 border border-brand-800/60 text-[11px] text-brand-200">
                <strong>Recommended:</strong> {ins.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reject Reason Modal */}
      {rejectingRequest && (
        <RejectCommentModal
          isOpen={!!rejectingRequest}
          onClose={() => setRejectingRequest(null)}
          request={rejectingRequest}
          onConfirmReject={rejectLeave}
        />
      )}
    </div>
  );
}