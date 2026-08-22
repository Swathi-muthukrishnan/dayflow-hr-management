import React from 'react';
import {
  BookOpen,
  ArrowLeftRight,
  AlertTriangle,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Sparkles,
  Scan,
  Plus,
  Layers,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { StatCard } from '../common/StatCard';
import { Button } from '../common/Button';
import { Badge, StatusBadge } from '../common/Badge';
import { METRICS_DATA } from '../../services/mockData';

export function OverviewTab() {
  const {
    books,
    loans,
    members,
    fines,
    stats,
    setActiveTab,
    setIsAddBookOpen,
    dispatchOverdueAlerts
  } = useLibrary();

  const activeLoans = loans.filter(l => l.status === 'active' || l.status === 'due_soon');
  const overdueLoans = loans.filter(l => l.status === 'overdue');
  const recentLoans = loans.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner with Welcome & Quick Actions */}
      <div className="rounded-3xl border border-brand-200 dark:border-brand-800/60 bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold font-mono mb-2 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              COMMAND CENTER TELEMETRY
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Library Operational Status: Nominal
            </h2>
            <p className="text-sm text-brand-100 mt-1 max-w-xl">
              All RFID gates, auto-indexers, and overdue recovery daemons are operating at peak efficiency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              icon={Scan}
              onClick={() => setActiveTab('scanner')}
              className="bg-white text-brand-900 hover:bg-brand-50 font-bold border-none shadow-md"
            >
              Launch RFID Scanner
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => setIsAddBookOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold"
            >
              Add New Book
            </Button>
          </div>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Active Loans"
          value={stats.activeLoansCount}
          subtitle="Currently in circulation"
          icon={ArrowLeftRight}
          trend="+12% this week"
          trendPositive={true}
          color="brand"
          onClick={() => setActiveTab('circulation')}
        />
        <StatCard
          title="Overdue Attention"
          value={stats.overdueCount}
          subtitle="Requires auto-nudge"
          icon={AlertTriangle}
          trend={stats.overdueCount > 0 ? 'Urgent Followup' : 'All Clear'}
          trendPositive={stats.overdueCount === 0}
          color="rose"
          onClick={() => setActiveTab('circulation')}
        />
        <StatCard
          title="Shelf Occupancy"
          value={`${stats.shelfOccupancyPercent}%`}
          subtitle={`${stats.availableBooks} copies available on rack`}
          icon={Layers}
          trend="Balanced"
          trendPositive={true}
          color="emerald"
          onClick={() => setActiveTab('catalog')}
        />
        <StatCard
          title="Pending Fines"
          value={`$${stats.totalFinesPending.toFixed(2)}`}
          subtitle={`$${stats.totalFinesCollected.toFixed(2)} recovered`}
          icon={DollarSign}
          trend="87% Recovery"
          trendPositive={true}
          color="amber"
          onClick={() => setActiveTab('fines')}
        />
      </div>

      {/* Grid: Weekly Circulation Trend Chart & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Circulation Activity Chart */}
        <div className="lg:col-span-7 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-surface-100 dark:border-surface-800">
            <div>
              <h3 className="text-base font-bold text-surface-900 dark:text-white">
                Weekly Circulation Velocity
              </h3>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Checkouts vs. Returns across the last 7 days
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-brand-600 dark:bg-brand-500" /> Loans
              </span>
              <span className="flex items-center gap-1.5 text-accent-600 dark:text-accent-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-accent-500" /> Returns
              </span>
            </div>
          </div>

          {/* Responsive SVG Bar Visualizer */}
          <div className="mt-6">
            <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-48 pt-4">
              {METRICS_DATA.circulationTrends.map((d, i) => {
                const maxVal = 100;
                const loanHeight = (d.loans / maxVal) * 100;
                const returnHeight = (d.returns / maxVal) * 100;
                return (
                  <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-36">
                      {/* Loan Bar */}
                      <div
                        style={{ height: `${loanHeight}%` }}
                        className="w-1/2 bg-brand-500 hover:bg-brand-400 rounded-t-md transition-all duration-200 relative group-hover:shadow-glow-sm"
                        title={`${d.day}: ${d.loans} Loans`}
                      />
                      {/* Return Bar */}
                      <div
                        style={{ height: `${returnHeight}%` }}
                        className="w-1/2 bg-accent-500 hover:bg-accent-400 rounded-t-md transition-all duration-200"
                        title={`${d.day}: ${d.returns} Returns`}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-surface-500 group-hover:text-brand-600">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Category Allocation */}
        <div className="lg:col-span-5 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-surface-100 dark:border-surface-800">
              <h3 className="text-base font-bold text-surface-900 dark:text-white">
                Catalog by Discipline
              </h3>
              <span className="text-xs font-mono text-surface-500">{stats.uniqueTitles} Titles</span>
            </div>

            <div className="mt-5 space-y-4">
              {METRICS_DATA.categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-surface-700 dark:text-surface-300">{cat.name}</span>
                    <span className="font-mono font-bold text-surface-900 dark:text-white">
                      {cat.count} books ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                    <div
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                      className="h-full rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
            <span className="text-xs text-surface-500">Need specific book analysis?</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('ai')}
              className="text-xs"
            >
              Ask AI Recommender
            </Button>
          </div>
        </div>
      </div>

      {/* Grid: Overdue Watchlist & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Overdue Priority Watchlist */}
        <div className="lg:col-span-6 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-surface-100 dark:border-surface-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-base font-bold text-surface-900 dark:text-white">
                Overdue Circulation Watchlist
              </h3>
            </div>
            <Button
              size="sm"
              variant="secondary"
              icon={Sparkles}
              onClick={dispatchOverdueAlerts}
              className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400"
            >
              Batch Alert ({overdueLoans.length})
            </Button>
          </div>

          <div className="mt-4 divide-y divide-surface-100 dark:divide-surface-800">
            {overdueLoans.length === 0 ? (
              <div className="py-8 text-center text-xs text-surface-400 font-medium">
                No overdue loans at this moment. 100% on-time rate!
              </div>
            ) : (
              overdueLoans.map((loan) => (
                <div key={loan.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={loan.bookCover}
                      alt={loan.bookTitle}
                      className="w-10 h-14 object-cover rounded-md shadow-sm shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-surface-900 dark:text-white truncate">
                        {loan.bookTitle}
                      </h4>
                      <p className="text-[11px] text-surface-500 dark:text-surface-400 truncate">
                        Borrowed by <span className="font-semibold">{loan.patronName}</span>
                      </p>
                      <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                        Due: {loan.dueDate} (Fine: ${loan.fineAmount.toFixed(2)})
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveTab('circulation')}
                    className="shrink-0 text-xs py-1 px-2.5"
                  >
                    Manage
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Circulation Ledger Activity */}
        <div className="lg:col-span-6 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-surface-100 dark:border-surface-800">
            <h3 className="text-base font-bold text-surface-900 dark:text-white">
              Recent Circulation Stream
            </h3>
            <button
              onClick={() => setActiveTab('circulation')}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {recentLoans.map((loan) => (
              <div
                key={loan.id}
                className="p-3 rounded-xl bg-surface-50 dark:bg-surface-950 border border-surface-200/80 dark:border-surface-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 text-surface-500">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-surface-900 dark:text-white block truncate max-w-[200px] sm:max-w-xs">
                      {loan.bookTitle}
                    </span>
                    <span className="text-[11px] text-surface-500">
                      {loan.patronName} • {loan.issueDate}
                    </span>
                  </div>
                </div>

                <StatusBadge status={loan.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}