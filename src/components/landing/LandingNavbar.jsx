import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  LayoutDashboard,
  Moon,
  Sun,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';

export function LandingNavbar({ onLaunchDashboard }) {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Problem & Solution', href: '#problem' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Key Features', href: '#features' },
    { name: 'Interactive Demo', href: '#sandbox' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Impact', href: '#impact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-200/80 dark:border-surface-800/80 glass-nav transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-surface-900 dark:text-white">
                  LibFlow<span className="text-brand-500">OS</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  <Sparkles className="w-2.5 h-2.5" /> v2.4 Live
                </span>
              </div>
              <p className="text-[11px] text-surface-500 dark:text-surface-400 font-medium hidden sm:block">
                Autonomous Library Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-surface-600 hover:text-brand-600 dark:text-surface-300 dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800 border border-surface-200 dark:border-surface-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <a
              href="#sandbox"
              className="text-xs font-semibold px-3 py-2 rounded-xl text-surface-700 hover:text-surface-900 dark:text-surface-300 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800/80 transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Judge Sandbox
            </a>

            {/* Main Launch Dashboard CTA */}
            <Button
              variant="gradient"
              size="sm"
              icon={LayoutDashboard}
              onClick={onLaunchDashboard}
              className="font-semibold shadow-glow-sm"
            >
              Launch Dashboard
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 border-b border-surface-200 dark:border-surface-800 bg-white/95 dark:bg-surface-900/95 backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-surface-200 dark:border-surface-800 flex flex-col gap-2">
              <Button
                variant="gradient"
                icon={LayoutDashboard}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLaunchDashboard();
                }}
                className="w-full"
              >
                Open Live Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}