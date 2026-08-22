// src/pages/employee/EmployeeNotifications.jsx
import React, { useState } from 'react';
import { Bell, Check, Trash2, CheckCircle2, AlertTriangle, Info, Sparkles } from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export function EmployeeNotifications() {
  const {
    notifications,
    unreadNotifsCount,
    markNotifAsRead,
    markAllNotifsAsRead,
    clearNotifications
  } = useHrms();

  const [filter, setFilter] = useState('All'); // 'All' | 'Unread'

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'Unread') return !n.read;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
              Notification Center
            </h1>
            {unreadNotifsCount > 0 && (
              <Badge variant="danger" size="xs">
                {unreadNotifsCount} Unread
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Real-time feed of attendance confirmations, leave approval decisions, and salary alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Check}
            onClick={markAllNotifsAsRead}
            className="text-xs"
          >
            Mark All Read
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={Trash2}
            onClick={clearNotifications}
            className="text-xs text-rose-600 dark:text-rose-400"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'Unread'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === f
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            {f} {f === 'Unread' && unreadNotifsCount > 0 ? `(${unreadNotifsCount})` : ''}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 text-surface-400 space-y-2">
            <Bell className="w-8 h-8 mx-auto text-surface-300 dark:text-surface-700" />
            <p className="font-bold text-sm text-surface-700 dark:text-surface-300">
              No notifications to display
            </p>
            <p className="text-xs text-surface-400">
              You are completely up to date.
            </p>
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotifAsRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                n.read
                  ? 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 opacity-75'
                  : 'bg-brand-50/50 dark:bg-brand-950/40 border-brand-200 dark:border-brand-800 shadow-sm'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {n.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : n.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                ) : (
                  <Info className="w-5 h-5 text-brand-500" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-surface-900 dark:text-white">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-surface-400 font-mono">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                  {n.message}
                </p>
              </div>

              {!n.read && (
                <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 self-center" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}