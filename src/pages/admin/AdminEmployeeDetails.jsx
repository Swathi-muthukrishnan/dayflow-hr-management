// src/pages/admin/AdminEmployeeDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  ShieldCheck,
  CreditCard,
  Calendar,
  Download,
  Edit2,
  Check,
  Percent,
  Clock
} from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { formatCurrency } from '../../utils/payrollUtils';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EditSalaryModal } from '../../components/hr/EditSalaryModal';

export function AdminEmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, leaveRequests, generatePayslipPdfAction, updateEmployeeProfile } = useHrms();

  const employee = employees.find((e) => e.id === id) || employees[0];
  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [designation, setDesignation] = useState(employee?.designation || '');
  const [department, setDepartment] = useState(employee?.department || '');

  if (!employee) {
    return (
      <div className="p-8 text-center text-surface-400">
        <p>Employee record not found.</p>
        <Button variant="secondary" size="sm" onClick={() => navigate('/admin/employees')} className="mt-4">
          Back to Directory
        </Button>
      </div>
    );
  }

  const empLeaves = leaveRequests.filter((r) => r.employeeId === employee.id);

  const handleSaveJob = () => {
    updateEmployeeProfile(employee.id, {
      designation,
      department
    });
    setIsEditingJob(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/employees')}
        className="flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Employee Directory</span>
      </button>

      {/* Header Profile Dossier */}
      <div className="relative overflow-hidden rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-white dark:border-surface-800 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
                  {employee.name}
                </h1>
                <Badge variant="primary" size="xs">
                  {employee.id}
                </Badge>
                <Badge variant="success" size="xs">
                  Active
                </Badge>
              </div>
              <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                {employee.designation} • {employee.department}
              </p>
              <p className="text-xs text-surface-400 font-mono">
                Joined: {employee.joiningDate} • Manager: {employee.manager || 'Sarah Chen'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={CreditCard}
              onClick={() => setIsEditingSalary(true)}
              className="text-xs font-bold"
            >
              Adjust Salary
            </Button>
            <Button
              variant="gradient"
              size="sm"
              icon={Download}
              onClick={() => generatePayslipPdfAction(employee, 'August 2026')}
              className="text-xs font-bold shadow-glow-sm"
            >
              Generate Payslip
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 font-mono block">
              Attendance Rating
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {employee.attendanceRate || 95}%
            </span>
          </div>
          <Percent className="w-6 h-6 text-emerald-500" />
        </div>

        <div className="p-5 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 font-mono block">
              Remaining Paid Leave
            </span>
            <span className="text-2xl font-black text-brand-600 dark:text-brand-400 font-mono">
              {employee.leaveBalance?.paid || 12} Days
            </span>
          </div>
          <Calendar className="w-6 h-6 text-brand-500" />
        </div>

        <div className="p-5 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 font-mono block">
              Monthly Net Salary
            </span>
            <span className="text-2xl font-black text-surface-900 dark:text-white font-mono">
              {formatCurrency(employee.salary?.netSalary || 8350)}
            </span>
          </div>
          <CreditCard className="w-6 h-6 text-indigo-500" />
        </div>
      </div>

      {/* Employee Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-base text-surface-900 dark:text-white pb-2 border-b border-surface-100 dark:border-surface-800">
            Contact & Address Information
          </h3>
          <div className="space-y-2">
            <div>
              <span className="text-surface-400 block font-mono text-[10px] uppercase">Email</span>
              <span className="font-bold text-surface-900 dark:text-white">{employee.email}</span>
            </div>
            <div>
              <span className="text-surface-400 block font-mono text-[10px] uppercase">Phone</span>
              <span className="font-mono text-surface-900 dark:text-white">{employee.phone || '+1 (555) 234-5678'}</span>
            </div>
            <div>
              <span className="text-surface-400 block font-mono text-[10px] uppercase">Location</span>
              <span className="text-surface-900 dark:text-white">{employee.address || 'San Francisco, CA'}</span>
            </div>
          </div>
        </div>

        {/* Leave Requests History */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-base text-surface-900 dark:text-white pb-2 border-b border-surface-100 dark:border-surface-800">
            Employee Leave Records ({empLeaves.length})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {empLeaves.length === 0 ? (
              <p className="text-surface-400">No time-off requests submitted.</p>
            ) : (
              empLeaves.map((l) => (
                <div key={l.id} className="p-2.5 rounded-xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold block">{l.type} ({l.days}d)</span>
                    <span className="text-[10px] text-surface-400 font-mono">{l.from} → {l.to}</span>
                  </div>
                  <StatusBadge status={l.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Salary Adjustment Modal */}
      {isEditingSalary && (
        <EditSalaryModal
          isOpen={isEditingSalary}
          onClose={() => setIsEditingSalary(false)}
          employee={employee}
        />
      )}
    </div>
  );
}