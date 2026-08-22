import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  ArrowLeftRight,
  Users,
  Scan,
  Sparkles,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Menu,
  X,
  RefreshCw,
  ExternalLink,
  Zap
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function DashboardLayout({ onExitToLanding, children }) {
  const {
    activeTab,
    setActiveTab,
    persona,
    setPersona,
    notifications,
    setIsScannerOpen,
    setIsAddBookOpen,
    resetData,
    globalSearchQuery,
    setGlobalSearchQuery,
    stats
  } = useLibrary();

  const { isDark, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Command Center', icon: LayoutDashboard, badge: null },
    { id: 'catalog', label: 'Book Catalog', icon: BookOpen, badge: `${stats.uniqueTitles}` },
    { id: 'circulation', label: 'Circulation Desk', icon: ArrowLeftRight, badge: stats.overdueCount > 0 ? `${stats.overdueCount} due` : null, badgeColor: 'danger' },
    { id: 'members', label: 'Patrons & Members', icon: Users, badge: `${stats.totalMembers}` },
    { id: 'scanner', label: 'Smart Scanner Terminal', icon: Scan, badge: 'RFID Live', badgeColor: 'success' },
    { id: 'ai', label: 'AI Engine & Nudges', icon: Sparkles, badge: 'AI', badgeColor: 'primary' },
    { id: 'fines', label: 'Fines & Revenue', icon: DollarSign, badge: stats.totalFinesPending > 0 ? `$${stats.totalFinesPending.toFixed(0)}` : null, badgeColor: 'warning' },
    { id: 'reports', label: 'Analytics & Reports', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Settings & Backend API', icon: Settings, badge: null },
  ];

  const personas = [
    { name: 'Chief Librarian (Admin)', role: 'Full Admin Access', tag: 'Superadmin' },
    { name: 'Student Patron (Maya)', role: 'Self-Service & Loans', tag: 'Patron' },
    { name: 'Faculty (Dr. Vance)', role: 'Research & Reserves', tag: 'Faculty' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-100 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-surface-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-5 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-surface-900 dark:text-white">
                  LibFlow<span className="text-brand-500">OS</span>
                </span>
                <span className="block text-[10px] text-surface-500 dark:text-surface-400 font-mono">
                  v2.4 Enterprise Core
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Button */}
          <div className="p-4">
            <Button
              variant="gradient"
              size="sm"
              icon={Scan}
              onClick={() => {
                setActiveTab('scanner');
                setIsSidebarOpen(false);
              }}
              className="w-full font-bold shadow-glow-sm py-2.5"
            >
              ⚡ Quick RFID Scanner
            </Button>
          </div>

          {/* Navigation Links List */}
          <nav className="px-3 space-y-1 mt-1 max-h-[calc(100vh-280px)] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                    isSelected
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 shadow-sm border border-brand-200/60 dark:border-brand-800/60'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-surface-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <Badge
                      variant={item.badgeColor || 'default'}
                      size="sm"
                      className="text-[10px] px-1.5 py-0.2"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Persona Info */}
        <div className="p-4 border-t border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-950/40">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onExitToLanding}
              className="text-xs font-semibold text-surface-500 hover:text-surface-800 dark:hover:text-surface-200 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit to Landing Page
            </button>

            <button
              onClick={resetData}
              title="Reset mock database to initial showcase state"
              className="p-1.5 rounded-lg text-surface-400 hover:text-brand-600 hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Current Persona Card */}
          <div className="p-2.5 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-xs">
                {persona[0]}
              </div>
              <div className="truncate">
                <span className="block text-xs font-bold text-surface-900 dark:text-white truncate">
                  {persona}
                </span>
                <span className="block text-[10px] text-surface-400 font-mono">
                  Online Persona
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Mobile Sidebar Toggle & Search */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Quick Search */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                placeholder="Global search (Books, Members, Loans, ISBN)..."
                className="w-full pl-9 pr-4 py-2 bg-surface-100 dark:bg-surface-950 border border-transparent focus:border-brand-500 rounded-xl text-xs sm:text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Add Book Action */}
            <Button
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => setIsAddBookOpen(true)}
              className="hidden sm:inline-flex text-xs font-semibold"
            >
              Add Book
            </Button>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 border border-surface-200 dark:border-surface-800 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span className="hidden md:inline font-semibold">{persona.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-surface-400" />
              </button>

              {isPersonaMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-xl p-2 z-50 animate-scaleUp">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase text-surface-400 font-mono border-b border-surface-100 dark:border-surface-800">
                    Switch Test Persona
                  </div>
                  {personas.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setPersona(p.name);
                        setIsPersonaMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                        persona === p.name
                          ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold'
                          : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-[10px] text-surface-400">{p.role}</div>
                      </div>
                      <Badge size="sm" variant={persona === p.name ? 'primary' : 'default'}>
                        {p.tag}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Dropdown Drawer */}
            <div className="relative">
              <button
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="relative p-2 rounded-xl text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 border border-surface-200 dark:border-surface-800 transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>

              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-2xl p-4 z-50 animate-scaleUp">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
                    <span className="font-bold text-xs uppercase tracking-wider text-surface-500 font-mono">
                      Live Telemetry Feed
                    </span>
                    <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold">
                      {notifications.length} Alerts
                    </span>
                  </div>

                  <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 rounded-xl bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-surface-900 dark:text-white">
                            {n.title}
                          </span>
                          <span className="text-[10px] text-surface-400 font-mono">
                            {n.timestamp}
                          </span>
                        </div>
                        <p className="text-surface-600 dark:text-surface-400 mt-1 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 border border-surface-200 dark:border-surface-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Tab Content Rendering Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}