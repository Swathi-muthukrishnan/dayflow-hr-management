import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none';

  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-sm hover:shadow-glow-sm focus:ring-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400',
    accent: 'bg-accent-600 hover:bg-accent-500 text-white shadow-sm hover:shadow-glow-emerald focus:ring-accent-500',
    secondary: 'bg-surface-100 hover:bg-surface-200 text-surface-800 border border-surface-300 dark:bg-surface-800 dark:hover:bg-surface-700 dark:text-surface-100 dark:border-surface-700 focus:ring-surface-400',
    outline: 'border border-surface-300 hover:border-brand-500 text-surface-700 hover:text-brand-600 bg-transparent dark:border-surface-700 dark:hover:border-brand-400 dark:text-surface-300 dark:hover:text-brand-300 focus:ring-brand-500',
    ghost: 'text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-800/60 focus:ring-surface-400',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm focus:ring-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400',
    gradient: 'bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white shadow-md hover:shadow-glow-md focus:ring-brand-500 border border-white/10',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 font-medium',
    md: 'text-sm px-4 py-2.5 gap-2 font-medium',
    lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
    icon: 'p-2 rounded-lg',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      )}
      {children}
      {!isLoading && IconRight && (
        <IconRight className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      )}
    </button>
  );
}