// src/components/hr/EditSalaryModal.jsx
import React, { useState, useEffect } from 'react';
import { DollarSign, Check, AlertCircle } from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { formatCurrency, calculateSalaryBreakdown } from '../../utils/payrollUtils';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export function EditSalaryModal({ isOpen, onClose, employee }) {
  const { updateEmployeeSalary } = useHrms();

  const [basic, setBasic] = useState(7000);
  const [allowances, setAllowances] = useState(1500);
  const [deductions, setDeductions] = useState(800);

  useEffect(() => {
    if (employee?.salary) {
      setBasic(employee.salary.basic || 7000);
      setAllowances(employee.salary.allowances || 1500);
      setDeductions(employee.salary.deductions || 800);
    }
  }, [employee]);

  if (!employee) return null;

  const breakdown = calculateSalaryBreakdown(Number(basic) || 0, Number(allowances) || 0, Number(deductions) || 0);

  const handleSave = (e) => {
    e.preventDefault();
    updateEmployeeSalary(employee.id, {
      basic: Number(basic),
      allowances: Number(allowances),
      deductions: Number(deductions),
      netSalary: breakdown.net,
      bankAccount: employee.salary?.bankAccount || '•••• •••• •••• 4912',
      taxId: employee.salary?.taxId || 'TX-8921-948'
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Compensation & Payroll Package"
      subtitle={`Configuring salary structure for ${employee.name} (${employee.designation})`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSave} className="space-y-4">
        {/* Form Inputs */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 font-mono mb-1">
              Monthly Basic Pay ($)
            </label>
            <input
              type="number"
              value={basic}
              onChange={(e) => setBasic(e.target.value)}
              required
              min="0"
              className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm font-mono text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 font-mono mb-1">
              Allowances & Bonuses ($)
            </label>
            <input
              type="number"
              value={allowances}
              onChange={(e) => setAllowances(e.target.value)}
              required
              min="0"
              className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm font-mono text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 font-mono mb-1">
              Deductions (TDS, PF & Health) ($)
            </label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              required
              min="0"
              className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm font-mono text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Live Net Pay Calculation Summary */}
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-mono block">
              Calculated Net Pay
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400">
              Gross: {formatCurrency(breakdown.gross)} - Deductions: {formatCurrency(breakdown.deductions)}
            </span>
          </div>
          <span className="text-2xl font-black text-indigo-900 dark:text-indigo-200 font-mono">
            {formatCurrency(breakdown.net)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-100 dark:border-surface-800">
          <Button variant="secondary" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="primary" size="sm" type="submit" icon={Check} className="font-bold">
            Save & Update Package
          </Button>
        </div>
      </form>
    </Modal>
  );
}