// src/components/common/Badge.jsx
import React from 'react';

export function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const variantStyles = {
    default: 'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300 border-surface-200 dark:border-surface-700',
    primary: 'bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 border-brand-200/70 dark:border-brand-800/70',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200/70 dark:border-emerald-800/70',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/70',
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200/70 dark:border-rose-800/70',
    info: 'bg-sky-50 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300 border-sky-200/70 dark:border-sky-800/70',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200/70 dark:border-purple-800/70',
  };

  const sizeStyles = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium',
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide font-sans ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.md} ${className}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status, className = '' }) {
  const norm = String(status || '').toLowerCase().replace(/\s+|_/g, '');

  switch (norm) {
    case 'present':
    case 'checkedin':
    case 'approved':
    case 'active':
    case 'paid':
    case 'verified':
      return (
        <Badge variant="success" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {status}
        </Badge>
      );

    case 'working':
    case 'currentlyworking':
      return (
        <Badge variant="primary" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping"></span>
          Currently Working
        </Badge>
      );

    case 'halfday':
    case 'pending':
    case 'due':
    case 'review':
      return (
        <Badge variant="warning" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          {status}
        </Badge>
      );

    case 'leave':
    case 'onleave':
      return (
        <Badge variant="info" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          {status}
        </Badge>
      );

    case 'absent':
    case 'rejected':
    case 'overdue':
    case 'failed':
      return (
        <Badge variant="danger" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          {status}
        </Badge>
      );

    case 'weekend':
      return (
        <Badge variant="default" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-surface-400"></span>
          Weekend
        </Badge>
      );

    case 'notcheckedin':
      return (
        <Badge variant="default" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-surface-400"></span>
          Not Checked In
        </Badge>
      );

    default:
      return <Badge variant="default" className={className}>{status}</Badge>;
  }
}