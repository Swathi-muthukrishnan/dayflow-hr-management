// src/components/hr/PayslipPreviewModal.jsx
import React from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, Printer, X } from 'lucide-react';
import { formatCurrency } from '../../utils/payrollUtils';
import { useHrms } from '../../context/HrmsContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export function PayslipPreviewModal({ isOpen, onClose, payslip, employee }) {
  const { generatePayslipPdfAction } = useHrms();

  if (!payslip || !employee) return null;

  const handleDownload = () => {
    generatePayslipPdfAction(employee, payslip.period);
  };

  const basic = payslip.basic || 7500;
  const allowances = payslip.allowances || 1800;
  const deductions = payslip.deductions || 950;
  const netSalary = payslip.netSalary || 8350;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Salary Payslip Digital Statement"
      subtitle={`Official Dayflow Payroll Statement for ${payslip.period}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Payslip Header Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-900 to-indigo-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-xl">
              D
            </div>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">DAYFLOW</h3>
              <p className="text-xs text-brand-200">Technologies Inc. • Payroll Dispatch</p>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-[10px] uppercase text-brand-300 block">Statement Period</span>
            <span className="font-bold text-sm">{payslip.period}</span>
          </div>
        </div>

        {/* Employee Dossier Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 text-xs font-mono">
          <div>
            <span className="text-surface-400 block text-[10px] uppercase">Employee</span>
            <span className="font-bold text-surface-900 dark:text-white">{employee.name}</span>
          </div>
          <div>
            <span className="text-surface-400 block text-[10px] uppercase">Employee ID</span>
            <span className="font-bold text-surface-900 dark:text-white">{employee.id}</span>
          </div>
          <div>
            <span className="text-surface-400 block text-[10px] uppercase">Department</span>
            <span className="font-bold text-surface-900 dark:text-white">{employee.department}</span>
          </div>
          <div>
            <span className="text-surface-400 block text-[10px] uppercase">Pay Date</span>
            <span className="font-bold text-surface-900 dark:text-white">{payslip.payDate || 'Aug 31, 2026'}</span>
          </div>
        </div>

        {/* Earnings & Deductions Tables */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Earnings */}
          <div className="rounded-2xl border border-surface-200 dark:border-surface-800 overflow-hidden">
            <div className="bg-surface-100 dark:bg-surface-800 px-4 py-2 font-bold font-mono text-[11px] uppercase text-surface-700 dark:text-surface-300 flex justify-between">
              <span>Earnings Component</span>
              <span>Amount</span>
            </div>
            <div className="p-3 space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Basic Salary</span>
                <span className="font-bold text-surface-900 dark:text-white">{formatCurrency(basic * 0.7)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">House Rent Allowance</span>
                <span className="font-bold text-surface-900 dark:text-white">{formatCurrency(basic * 0.2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Special Allowance</span>
                <span className="font-bold text-surface-900 dark:text-white">{formatCurrency(basic * 0.1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Performance Bonus</span>
                <span className="font-bold text-surface-900 dark:text-white">{formatCurrency(allowances * 0.6)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-surface-100 dark:border-surface-800 font-bold">
                <span>Gross Earnings:</span>
                <span className="text-emerald-600 dark:text-emerald-400">{formatCurrency(basic + allowances)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="rounded-2xl border border-surface-200 dark:border-surface-800 overflow-hidden">
            <div className="bg-surface-100 dark:bg-surface-800 px-4 py-2 font-bold font-mono text-[11px] uppercase text-surface-700 dark:text-surface-300 flex justify-between">
              <span>Deductions</span>
              <span>Amount</span>
            </div>
            <div className="p-3 space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Provident Fund / 401(k)</span>
                <span className="font-bold text-surface-900 dark:text-white">{formatCurrency(deductions * 0.4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Income Tax (TDS)</span>
                <span className="font-bold text-surface-900 dark:text-white">{formatCurrency(deductions * 0.45)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Health & Insurance</span>
                <span className="font-bold text-surface-900 dark:text-white">{formatCurrency(deductions * 0.15)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-surface-100 dark:border-surface-800 font-bold">
                <span>Total Deductions:</span>
                <span className="text-rose-600 dark:text-rose-400">-{formatCurrency(deductions)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Salary Payable Highlight */}
        <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 font-mono block">
              Net Disbursed Salary
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400">
              Credited to Account •••• 4912
            </span>
          </div>
          <span className="text-3xl font-black text-brand-800 dark:text-brand-200 font-mono">
            {formatCurrency(netSalary)}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-800">
          <span className="text-[11px] text-surface-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Digitally Authenticated
          </span>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={handleDownload}
              className="font-bold shadow-glow-sm"
            >
              Download PDF Statement
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}