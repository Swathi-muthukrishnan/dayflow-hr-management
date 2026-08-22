import React from 'react';
import { ArrowRight, Sparkles, LayoutDashboard, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';

export function CTASection({ onLaunchDashboard, onResetDemoData }) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[600px] h-[350px] bg-gradient-to-r from-brand-600/30 via-indigo-600/20 to-accent-600/30 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-200 dark:border-brand-800/80 bg-gradient-to-br from-brand-600 via-indigo-700 to-slate-900 p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden text-center">
          {/* Subtle light lines */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold font-mono mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-accent-300" />
              EVALUATE THE COMPLETE APPLICATION
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Experience the Autonomous Library Command Center?
            </h2>

            <p className="mt-5 text-base sm:text-lg text-brand-100 font-normal leading-relaxed">
              Launch the live interactive dashboard right now to test real-time checkouts, ISBN queries, AI overdue triggers, and member ID passes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={LayoutDashboard}
                iconRight={ArrowRight}
                onClick={onLaunchDashboard}
                className="w-full sm:w-auto bg-white text-brand-900 hover:bg-brand-50 shadow-xl text-base px-8 py-3.5 font-bold"
              >
                Launch Live Dashboard
              </Button>

              <Button
                variant="secondary"
                size="lg"
                icon={RefreshCw}
                onClick={onResetDemoData}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 text-base px-6 py-3.5 font-semibold"
              >
                Reset Demo Database
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}