import React from 'react';
import { XCircle, CheckCircle2, AlertOctagon, Sparkles, Clock, FileWarning, Zap, ShieldAlert, Cpu, BarChart3 } from 'lucide-react';

export function ProblemSolution() {
  const bottlenecks = [
    {
      title: 'Long Circulation Queues',
      desc: 'Manual checkouts take 3 to 6 minutes per patron during midterm and finals rushes, creating 25+ person desk queues.',
      icon: Clock
    },
    {
      title: 'Lost Revenue & Unpaid Fines',
      desc: 'Paper slips and delayed emails lead to 40%+ uncollected overdue fees and unaccounted missing inventory.',
      icon: FileWarning
    },
    {
      title: 'Blind Spot Demand Forecasting',
      desc: 'Librarians have no predictive intelligence on which reference materials will spike in demand before syllabus exams.',
      icon: AlertOctagon
    },
    {
      title: 'Siloed & Outdated Legacy Software',
      desc: '30-year-old desktop ILS systems lack mobile patron apps, modern REST APIs, or real-time catalog search.',
      icon: ShieldAlert
    }
  ];

  const solutions = [
    {
      title: 'Sub-Second RFID Batch Circulation',
      desc: 'Patrons drop a stack of 5 books on an RFID pad or scan their digital barcode for instant checkout in under 1 second.',
      icon: Zap
    },
    {
      title: 'Automated Multi-Channel Nudges',
      desc: 'AI proactively dispatches WhatsApp, SMS, and email alerts with 1-click digital fine payment links.',
      icon: Sparkles
    },
    {
      title: 'Predictive Demand & Shelf Heatmaps',
      desc: 'Vector AI models forecast course textbook demand 3 weeks ahead and alert staff to order extra copies or lock reserves.',
      icon: BarChart3
    },
    {
      title: 'Modern Cloud & API-First Core',
      desc: 'Plug-and-play REST/GraphQL architecture with role-based access for librarians, faculty researchers, and students.',
      icon: Cpu
    }
  ];

  return (
    <section id="problem" className="py-20 lg:py-28 bg-surface-100/50 dark:bg-surface-900/40 border-y border-surface-200 dark:border-surface-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 font-mono">
            The Industry Bottleneck
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Traditional Library Software is Stuck in 1998.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-600 dark:text-surface-400">
            See how LibFlow OS transforms cumbersome manual desk operations into an autonomous, intelligence-driven workflow.
          </p>
        </div>

        {/* Side by side comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Legacy Side (Problem) */}
          <div className="rounded-3xl border border-rose-200 dark:border-rose-900/40 bg-white dark:bg-surface-900 p-8 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 pb-6 border-b border-surface-100 dark:border-surface-800">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/80 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-surface-900 dark:text-white">
                  The Old Way (Legacy ILS / Spreadsheets)
                </h3>
                <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                  Slow, High Friction, Revenue Leakage
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {bottlenecks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="shrink-0 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-500 mt-1">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                        {item.title}
                      </h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modern LibFlow OS Side (Solution) */}
          <div className="rounded-3xl border border-brand-200 dark:border-brand-800/80 bg-gradient-to-b from-brand-50/30 to-white dark:from-brand-950/30 dark:to-surface-900 p-8 shadow-md relative overflow-hidden">
            {/* Subtle glow badge */}
            <div className="flex items-center gap-3 pb-6 border-b border-brand-100 dark:border-brand-900/60">
              <div className="w-10 h-10 rounded-xl bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white shadow-glow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-surface-900 dark:text-white">
                  The LibFlow OS Way
                </h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
                  Autonomous, Instant, Data-Empowered
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {solutions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="shrink-0 p-2 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 mt-1">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                        {item.title}
                      </h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}