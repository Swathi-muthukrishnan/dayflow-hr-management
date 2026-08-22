// src/pages/public/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Clock,
  CalendarDays,
  CreditCard,
  BarChart3,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Users,
  BrainCircuit,
  Lock,
  Globe,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export function Landing() {
  const navigate = useNavigate();
  const { switchDemoRole } = useAuth();

  const handleLaunchEmployee = () => {
    switchDemoRole('Employee');
    navigate('/employee/dashboard');
  };

  const handleLaunchAdmin = () => {
    switchDemoRole('HR/Admin');
    navigate('/admin/dashboard');
  };

  const features = [
    {
      icon: Clock,
      title: 'Smart Attendance',
      desc: 'High-precision browser geolocation capture with optional optical face verification and live shift timer.',
      badge: 'GPS + Biometric'
    },
    {
      icon: BrainCircuit,
      title: 'Intelligent Leave Insights',
      desc: 'Rule-based workforce pattern engine detecting absence clusters, burnout risks, and team scheduling bottlenecks.',
      badge: 'AI Rule Engine'
    },
    {
      icon: Flame,
      title: 'GitHub-Style Heatmap',
      desc: 'Visually compelling 6-month presence grid tracking streak consistency, on-time benchmarks, and punctuality.',
      badge: 'Interactive'
    },
    {
      icon: CreditCard,
      title: 'Auto-Generated Payslips',
      desc: 'One-click dynamic PDF statement generation using jsPDF with transparent earnings and tax withholding tables.',
      badge: 'jsPDF Core'
    },
    {
      icon: BarChart3,
      title: 'Workforce Analytics',
      desc: 'Interactive Recharts dashboards visualizing weekly attendance trends, leave distributions, and payroll allocations.',
      badge: 'Recharts'
    },
    {
      icon: Lock,
      title: 'Role-Based Access',
      desc: 'Secure dual-portal architecture separating self-service employee tools from executive HR approval workflows.',
      badge: 'Enterprise RBAC'
    }
  ];

  const workflowSteps = [
    { step: '1', title: 'Employee', desc: 'Secure self-service portal' },
    { step: '2', title: 'Attendance', desc: 'GPS & Optical check-in' },
    { step: '3', title: 'Leave', desc: 'Auto-computed PTO filing' },
    { step: '4', title: 'Approval', desc: '1-click HR decisioning' },
    { step: '5', title: 'Payroll', desc: 'Instant PDF statement' },
    { step: '6', title: 'Insights', desc: 'Workforce intelligence' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-500 flex items-center justify-center text-white shadow-glow-sm font-extrabold text-lg">
            D
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-surface-900 dark:text-white flex items-center gap-1">
              DAYFLOW
            </span>
            <span className="block text-[10px] text-surface-400 font-mono leading-none">
              HRMS Cloud Platform
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-xs sm:text-sm font-semibold text-surface-700 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2 transition-colors"
          >
            Sign In
          </button>

          <Button
            variant="gradient"
            size="sm"
            onClick={handleLaunchEmployee}
            className="font-bold shadow-glow-sm text-xs"
          >
            Launch Live Demo
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 px-6 sm:px-12 text-center max-w-5xl mx-auto space-y-8">
          {/* Subtle glow orb */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-500/15 dark:bg-brand-500/25 blur-3xl" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200/80 dark:border-brand-800/80 text-brand-700 dark:text-brand-300 text-xs font-bold font-mono tracking-wide animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Hackathon Showcase Edition • 100% Frontend-Only
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-surface-900 dark:text-white">
              DAYFLOW
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-brand-600 dark:text-brand-400 tracking-tight">
              “Every workday, perfectly aligned.”
            </p>
            <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed">
              Modern HR management that brings people, attendance, leave, payroll, and insights together in one intelligent workspace.
            </p>
          </div>

          {/* Quick Demo Launch Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="gradient"
              size="lg"
              iconRight={ArrowRight}
              onClick={handleLaunchEmployee}
              className="font-bold shadow-glow-md px-8 py-3.5 text-sm sm:text-base"
            >
              Explore Employee Portal
            </Button>

            <Button
              variant="outline"
              size="lg"
              icon={ShieldCheck}
              onClick={handleLaunchAdmin}
              className="font-bold px-6 py-3.5 text-sm sm:text-base"
            >
              Explore HR / Admin Console
            </Button>
          </div>

          {/* Floating HR Dashboard Preview Mockup */}
          <div className="relative pt-8 animate-scaleUp">
            <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white/80 dark:bg-surface-900/80 p-4 sm:p-6 shadow-2xl backdrop-blur-md max-w-4xl mx-auto text-left space-y-4">
              {/* Mock Dashboard Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 font-bold text-surface-400 font-mono">Dayflow Enterprise OS v2.4</span>
                </div>
                <Badge variant="success" size="xs">Live Telemetry Active</Badge>
              </div>

              {/* Mock Dashboard Mini Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800">
                  <span className="text-[10px] text-surface-400 font-mono uppercase block">Attendance Rate</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-lg font-mono">96.4%</span>
                </div>
                <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800">
                  <span className="text-[10px] text-surface-400 font-mono uppercase block">Current Streak</span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 text-lg font-mono">8 Days</span>
                </div>
                <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800">
                  <span className="text-[10px] text-surface-400 font-mono uppercase block">Paid Leave Balance</span>
                  <span className="font-extrabold text-brand-600 dark:text-brand-400 text-lg font-mono">12 Days</span>
                </div>
                <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800">
                  <span className="text-[10px] text-surface-400 font-mono uppercase block">August Payslip</span>
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-lg font-mono">$8,350</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW VISUALIZATION */}
        <section className="py-16 px-6 sm:px-12 bg-white dark:bg-surface-900 border-y border-surface-200 dark:border-surface-800">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <Badge variant="primary" size="xs">End-to-End Alignment</Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-surface-900 dark:text-white">
                How Dayflow Powers Your Workday
              </h2>
              <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400">
                A seamless operational pipeline connecting self-service employees to intelligent executive decisioning.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {workflowSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className="p-4 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 text-center space-y-2 relative"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-extrabold font-mono text-sm mx-auto flex items-center justify-center">
                    {step.step}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-surface-900 dark:text-white">{step.title}</h4>
                  <p className="text-[10px] text-surface-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY DAYFLOW? - 6 INNOVATION FEATURE CARDS */}
        <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="purple" size="xs">Core Capabilities</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-surface-900 dark:text-white tracking-tight">
              Why Dayflow Outperforms Traditional HRMS
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 max-w-xl mx-auto">
              Engineered with innovation-first features for modern distributed and hybrid organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="primary" size="xs">{f.badge}</Badge>
                    </div>

                    <h3 className="font-extrabold text-base text-surface-900 dark:text-white">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-20 px-6 sm:px-12 bg-gradient-to-r from-brand-950 via-surface-900 to-brand-950 text-white text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to Align Every Workday?
            </h2>
            <p className="text-xs sm:text-base text-surface-300">
              Test the live interactive demo now — experience GPS smart attendance, GitHub-style heatmaps, rule-based leave insights, and instant jsPDF payslips.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                variant="gradient"
                size="lg"
                onClick={handleLaunchEmployee}
                className="font-bold shadow-glow-md px-8 py-3.5 text-sm"
              >
                Launch Employee Demo
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleLaunchAdmin}
                className="font-bold border-white/30 text-white hover:bg-white/10 px-8 py-3.5 text-sm"
              >
                Launch HR Admin Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 py-6 px-6 sm:px-12 text-center text-xs text-surface-400 font-mono">
        <p>© 2026 DAYFLOW Technologies Inc. • Every workday, perfectly aligned • Built for Hackathon Demo</p>
      </footer>
    </div>
  );
}