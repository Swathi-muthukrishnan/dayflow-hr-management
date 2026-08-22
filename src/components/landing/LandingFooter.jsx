import React from 'react';
import { BookOpen, Github, Code, Sparkles, Heart } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-surface-200 dark:border-surface-800/80 bg-white dark:bg-surface-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-surface-900 dark:text-white">
                LibFlow<span className="text-brand-500">OS</span>
              </span>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Hackathon Showcase Edition • Modern Library Intelligence
              </p>
            </div>
          </div>

          {/* Quick links & Status Badge */}
          <div className="flex items-center gap-6 text-xs text-surface-500 dark:text-surface-400">
            <span className="inline-flex items-center gap-1.5 font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All Services Operational
            </span>
            <span>React 18 + Vite + Tailwind</span>
            <span>REST API Ready</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-surface-100 dark:border-surface-800 text-center text-xs text-surface-400">
          Built for hackathon evaluation • Production-ready modular architecture.
        </div>
      </div>
    </footer>
  );
}