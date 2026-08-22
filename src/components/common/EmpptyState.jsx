import React from 'react';
import { BookX, SearchX, Inbox } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No items found',
  description = 'There are no records matching your current filter or search criteria.',
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-surface-300 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/30 ${className}`}>
      <div className="p-4 rounded-2xl bg-surface-100 dark:bg-surface-800/80 text-surface-400 dark:text-surface-500 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-bold text-surface-900 dark:text-surface-100">
        {title}
      </h4>
      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400 max-w-sm">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          className="mt-5"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}