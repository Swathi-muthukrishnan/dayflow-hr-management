import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  CheckCircle2,
  BookOpen,
  ScanLine,
  BellRing,
  TrendingUp,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function HeroSection({ onLaunchDashboard, onExploreSandbox }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Dynamic Background Glow / Grids */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-brand-600/20 via-indigo-500/15 to-accent-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-brand-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50/80 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-6 shadow-sm animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Next-Gen Hackathon Showcase: Library 4.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-950 dark:text-white leading-[1.15]">
            The Autonomous Operating System for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-500">
              Modern Libraries.
            </span>
          </h1>

          {/* Subtitle / Problem & Solution Statement */}
          <p className="mt-6 text-lg sm:text-xl text-surface-600 dark:text-surface-300 leading-relaxed font-normal max-w-3xl mx-auto">
            Say goodbye to clunky 1990s desktop catalogs. LibFlow OS automates RFID smart checkouts, auto-resolves ISBN records in milliseconds, dispatches predictive overdue recovery, and unlocks live shelf intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="gradient"
              size="lg"
              iconRight={ArrowRight}
              onClick={onLaunchDashboard}
              className="w-full sm:w-auto text-base px-8 py-3.5 shadow-glow-md"
            >
              Explore Live Dashboard
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Zap}
              onClick={onExploreSandbox}
              className="w-full sm:w-auto text-base px-6 py-3.5 border-surface-300 dark:border-surface-700 bg-white/70 dark:bg-surface-900/70 backdrop-blur-md"
            >
              Test Interactive Sandbox
            </Button>
          </div>

          {/* Micro Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-surface-500 dark:text-surface-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Sub-Second Checkouts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> REST / GraphQL Backend Ready
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero-Setup Client Sandbox
            </span>
          </div>
        </div>

        {/* Hero Interactive Dashboard Mockup Preview */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Glowing frame */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-1000" />
          
          <div className="relative rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-2xl overflow-hidden">
            {/* Mock Window Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface-100/80 dark:bg-surface-950/80 border-b border-surface-200 dark:border-surface-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-surface-500 dark:text-surface-400">
                  libflow-core // telemetry-stream.v2
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  GATEWAY OPERATIONAL (12ms)
                </span>
              </div>
            </div>

            {/* Mock Dashboard Body Content */}
            <div className="p-6 sm:p-8 bg-surface-50/50 dark:bg-surface-950/40">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Metric 1 */}
                <div className="bg-white dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm">
                  <span className="text-xs text-surface-500 uppercase font-semibold">Active Loans</span>
                  <div className="text-2xl font-bold font-mono text-surface-900 dark:text-white mt-1">1,428</div>
                  <span className="text-[11px] text-emerald-600 font-medium">↑ 18% vs last week</span>
                </div>
                {/* Metric 2 */}
                <div className="bg-white dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm">
                  <span className="text-xs text-surface-500 uppercase font-semibold">Checkout Latency</span>
                  <div className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400 mt-1">0.82s</div>
                  <span className="text-[11px] text-emerald-600 font-medium">RFID Multi-batch</span>
                </div>
                {/* Metric 3 */}
                <div className="bg-white dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm">
                  <span className="text-xs text-surface-500 uppercase font-semibold">Catalog Accuracy</span>
                  <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">99.8%</div>
                  <span className="text-[11px] text-surface-400 font-medium">Zero desync records</span>
                </div>
                {/* Metric 4 */}
                <div className="bg-white dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 shadow-sm">
                  <span className="text-xs text-surface-500 uppercase font-semibold">Fine Recovery</span>
                  <div className="text-2xl font-bold font-mono text-accent-600 dark:text-accent-400 mt-1">87.4%</div>
                  <span className="text-[11px] text-emerald-600 font-medium">Auto-nudge WhatsApp</span>
                </div>
              </div>

              {/* Interactive Live Stream Showcase inside Hero */}
              <div className="mt-4 p-4 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                    <ScanLine className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-surface-900 dark:text-white">
                      Live RFID Circulation Stream
                    </div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">
                      Patron Maya Lin checked out 2 volumes in 0.6 seconds.
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={onLaunchDashboard}
                  className="shrink-0 text-xs px-4"
                >
                  Enter Command Center
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Key Metrics Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-surface-200 dark:border-surface-800/80">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-surface-900 dark:text-white tracking-tight">
              &lt; 1.2s
            </div>
            <div className="text-xs sm:text-sm font-semibold text-surface-500 dark:text-surface-400 mt-1">
              Average Checkout Speed
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-brand-600 dark:text-brand-400 tracking-tight">
              84%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-surface-500 dark:text-surface-400 mt-1">
              Fewer Overdue Delinquencies
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
              100,000+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-surface-500 dark:text-surface-400 mt-1">
              Catalog Items Scalability
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-accent-600 dark:text-accent-400 tracking-tight">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-surface-500 dark:text-surface-400 mt-1">
              Real-Time Interactive
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}