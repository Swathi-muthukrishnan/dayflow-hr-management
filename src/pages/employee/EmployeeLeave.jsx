// src/pages/employee/EmployeeLeave.jsx
import React, { useState } from 'react';
import { CalendarDays, Plus, Info } from 'lucide-react';
import { LeaveBalanceCards } from '../../components/leave/LeaveBalanceCards';
import { LeaveTable } from '../../components/leave/LeaveTable';
import { ApplyLeaveModal } from '../../components/leave/ApplyLeaveModal';
import { Button } from '../../components/common/Button';

export function EmployeeLeave() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
            Leave & Time-Off Management
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Monitor PTO allowances, submit vacation & sick leaves, and track supervisor approvals.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsApplyModalOpen(true)}
          className="font-bold shadow-glow-sm"
        >
          Apply for Leave
        </Button>
      </div>

      {/* Leave Category Allowances Cards */}
      <LeaveBalanceCards onApplyClick={() => setIsApplyModalOpen(true)} />

      {/* Leave Requests Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-base text-surface-900 dark:text-white">
          My Time-Off Request History
        </h3>
        <LeaveTable showAllEmployees={false} />
      </div>

      {/* Apply Leave Modal Dialog */}
      <ApplyLeaveModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}