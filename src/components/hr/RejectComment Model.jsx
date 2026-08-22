// src/components/hr/RejectCommentModal.jsx
import React, { useState } from 'react';
import { XCircle, AlertTriangle, Send } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export function RejectCommentModal({ isOpen, onClose, request, onConfirmReject }) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  if (!request) return null;

  const handleReject = () => {
    if (!comment.trim()) {
      setError('Please provide a constructive reason for rejecting this leave request.');
      return;
    }
    setError(null);
    onConfirmReject(request.id, comment.trim());
    setComment('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Decline Leave Request"
      subtitle={`Reviewing request from ${request.employeeName} (${request.type})`}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* Request Details Recap */}
        <div className="p-3.5 rounded-2xl bg-surface-100 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 text-xs space-y-1.5 font-mono">
          <div className="flex justify-between">
            <span className="text-surface-400">Employee:</span>
            <span className="font-bold text-surface-900 dark:text-white">{request.employeeName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-surface-400">Requested Dates:</span>
            <span className="text-surface-800 dark:text-surface-200">{request.from} → {request.to} ({request.days} Days)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-surface-400">Employee Reason:</span>
            <span className="text-surface-800 dark:text-surface-200 italic max-w-[200px] truncate">{request.remarks}</span>
          </div>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* HR Reason Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 font-mono mb-1.5">
            Why are you rejecting this request? <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g. Critical release sprint deadline or insufficient team coverage..."
            rows={3}
            required
            className="w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-100 dark:border-surface-800">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="danger"
            size="sm"
            icon={XCircle}
            onClick={handleReject}
            disabled={!comment.trim()}
            className="font-bold"
          >
            Confirm Rejection
          </Button>
        </div>
      </div>
    </Modal>
  );
}