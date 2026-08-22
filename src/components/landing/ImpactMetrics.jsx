import React, { useState } from 'react';
import { DollarSign, Clock, Users, Leaf, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '../common/Button';

export function ImpactMetrics({ onLaunchDashboard }) {
  const [patronCount, setPatronCount] = useState(5000);

  // Dynamic calculations based on patron count
  const hoursSavedPerSemester = Math.round((patronCount * 3.8 * 4.2) / 60); // 3.8 checkouts/student, 4.2 mins saved per checkout
  const revenueRecoveredAnnual = Math.round(patronCount * 6.5); // ~$6.50 recovered per patron from automated fine recovery
  const paperSlipsSaved = Math.round(patronCount * 8.4); // Paper receipts eliminated

  return (
    <section id="impact" className="py-20 lg:py-28 bg-surface-100/50 dark:bg-surface-900/40 border-y border-surface-200 dark:border-surface-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 font-mono">
            Measurable Institutional ROI
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Transform Library Economics with Real Savings
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-600 dark:text-surface-400">
            Use the interactive calculator below to forecast your campus or public library efficiency gains.
          </p>
        </div>

        {/* Interactive ROI Calculator Card */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-8 sm:p-12 shadow-xl max-w-4xl mx-auto">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-surface-900 dark:text-white">
                  Active Campus / Library Patrons:
                </label>
                <span className="font-mono text-xl font-extrabold text-brand-600 dark:text-brand-400">
                  {patronCount.toLocaleString()} Students & Researchers
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="30000"
                step="500"
                value={patronCount}
                onChange={(e) => setPatronCount(Number(e.target.value))}
                className="w-full h-3 bg-surface-200 dark:bg-surface-800 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-[11px] text-surface-400 mt-1 font-mono">
                <span>500 (Community Library)</span>
                <span>15,000 (Medium College)</span>
                <span>30,000+ (Major University)</span>
              </div>
            </div>

            {/* Calculated Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-surface-100 dark:border-surface-800">
              <div className="p-5 rounded-2xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/60">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Staff Hours Saved</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-surface-900 dark:text-white">
                  {hoursSavedPerSemester.toLocaleString()} hrs
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                  Per semester in desk wait times
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Revenue Recovered</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-surface-900 dark:text-white">
                  ${revenueRecoveredAnnual.toLocaleString()}
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                  Annual lost fine & fee retention
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/60">
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 mb-2">
                  <Leaf className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Paper Slips Cut</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-surface-900 dark:text-white">
                  {paperSlipsSaved.toLocaleString()}
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                  100% digital receipts & barcodes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}