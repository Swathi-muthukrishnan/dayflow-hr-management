// src/components/hr/SmartLeaveInsightsPanel.jsx
import React from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  BrainCircuit,
  Zap,
  Info
} from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { Badge } from '../common/Badge';

export function SmartLeaveInsightsPanel() {
  const { smartInsights } = useHrms();

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return <Badge variant="danger" size="xs">Critical Alert</Badge>;
      case 'medium':
        return <Badge variant="warning" size="xs">Action Recommended</Badge>;
      case 'positive':
        return <Badge variant="success" size="xs">Milestone Achieved</Badge>;
      default:
        return <Badge variant="info" size="xs">Pattern Detected</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-brand-200/60 dark:border-brand-800/60 bg-gradient-to-r from-brand-950 via-surface-900 to-brand-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/40 text-brand-300 text-xs font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Rule-Based Workforce Intelligence Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Smart Leave & Workforce Insights
          </h2>
          <p className="text-xs sm:text-sm text-surface-300 leading-relaxed">
            Continuous real-time pattern analysis scanning absence clusters, burnout risks, and team scheduling bottlenecks to keep every workday perfectly aligned.
          </p>
        </div>

        {/* Decorative Grid Glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-500/20 blur-3xl" />
      </div>

      {/* Grid of Rule-Based Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {smartInsights.map((insight) => {
          const isHigh = insight.severity === 'High';
          const isPositive = insight.severity === 'Positive';

          return (
            <div
              key={insight.id}
              className={`rounded-3xl border p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
                isHigh
                  ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                  : isPositive
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                  : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {isHigh ? (
                      <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                    ) : isPositive ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <BrainCircuit className="w-5 h-5 text-brand-500 shrink-0" />
                    )}
                    <h4 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                      {insight.title}
                    </h4>
                  </div>
                  {getSeverityBadge(insight.severity)}
                </div>

                {/* Target & Pattern */}
                <div className="p-3 rounded-2xl bg-surface-100/70 dark:bg-surface-950/50 border border-surface-200/60 dark:border-surface-800/60 text-xs">
                  <div className="flex items-center justify-between text-surface-500 dark:text-surface-400 font-mono text-[11px] mb-1">
                    <span>Target: <strong>{insight.employeeName}</strong></span>
                    <span className="text-brand-600 dark:text-brand-400 font-bold">{insight.category}</span>
                  </div>
                  <p className="text-surface-800 dark:text-surface-200 font-medium">
                    {insight.pattern}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-surface-500 dark:text-surface-400 font-mono">
                    <Info className="w-3.5 h-3.5 text-brand-500" />
                    <span>Impact: {insight.impact}</span>
                  </div>
                </div>

                {/* Actionable HR Recommendation */}
                <div className="p-3.5 rounded-2xl bg-brand-50/50 dark:bg-brand-950/40 border border-brand-200/50 dark:border-brand-800/50 text-xs space-y-1">
                  <span className="font-bold text-brand-700 dark:text-brand-300 block font-mono text-[10px] uppercase">
                    Recommended Action:
                  </span>
                  <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                    {insight.recommendation}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-100 dark:border-surface-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-surface-400">
                  Telemetry Metric: <strong className="text-surface-700 dark:text-surface-300">{insight.metric}</strong>
                </span>
                <button className="text-brand-600 dark:text-brand-400 font-bold hover:underline flex items-center gap-1">
                  Review Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}