// src/pages/admin/AdminPayroll.jsx
import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  Edit2,
  DollarSign,
  Building,
  ShieldCheck,
  CheckCircle2,
  Search,
  Zap,
  Printer
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useHrms } from '../../context/HrmsContext';
import { formatCurrency } from '../../utils/payrollUtils';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EditSalaryModal } from '../../components/hr/EditSalaryModal';

export function AdminPayroll() {
  const { employees, generatePayslipPdfAction, showToast } = useHrms();
  const [editingSalaryEmp, setEditingSalaryEmp] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);

  const totalPayrollGross = employees.reduce((sum, e) => sum + (e.salary?.basic || 7500) + (e.salary?.allowances || 1800), 0);
  const totalPayrollNet = employees.reduce((sum, e) => sum + (e.salary?.netSalary || 8350), 0);
  const totalDeductions = employees.reduce((sum, e) => sum + (e.salary?.deductions || 950), 0);

  const filteredEmployees = employees.filter((e) => {
    const q = searchQuery.toLowerCase();
    return !q || e.name.toLowerCase().includes(q) || e.department.toLowerCase().includes(q);
  });

  const salaryChartData = employees.map((e) => ({
    name: e.name.split(' ')[0],
    net: e.salary?.netSalary || 8350,
    gross: (e.salary?.basic || 7500) + (e.salary?.allowances || 1800),
  }));

  const handleBatchGenerate = () => {
    setIsBatchGenerating(true);
    setTimeout(() => {
      employees.forEach((emp) => {
        generatePayslipPdfAction(emp, 'August 2026');
      });
      setIsBatchGenerating(false);
      showToast(`Batch generated & dispatched ${employees.length} payslip PDF statements!`, 'success');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
            Payroll Management & Auto-Payslip Engine
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Administer employee salary structures, tax withholding, and generate official Dayflow PDF statements.
          </p>
        </div>

        <Button
          variant="gradient"
          size="md"
          icon={Zap}
          isLoading={isBatchGenerating}
          onClick={handleBatchGenerate}
          className="font-bold shadow-glow-sm"
        >
          Generate All Payslips (PDF)
        </Button>
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Total Net Payout"
          value={formatCurrency(totalPayrollNet)}
          subtitle="Net company disbursement"
          icon={CreditCard}
          color="brand"
        />
        <StatCard
          title="Total Gross Compensation"
          value={formatCurrency(totalPayrollGross)}
          subtitle="Base + allowances"
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Tax & Benefit Deductions"
          value={formatCurrency(totalDeductions)}
          subtitle="TDS, 401(k), health pools"
          icon={ShieldCheck}
          color="amber"
        />
        <StatCard
          title="Processed Roster"
          value={`${employees.length} / ${employees.length}`}
          subtitle="100% payroll compliance"
          icon={CheckCircle2}
          color="sky"
        />
      </div>

      {/* Salary Distribution Bar Chart */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
              Workforce Compensation Distribution ($ USD)
            </h3>
            <p className="text-xs text-surface-400">Net salary payout comparison per employee</p>
          </div>
          <Badge variant="primary" size="xs">August 2026 Cycle</Badge>
        </div>

        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                formatter={(val) => formatCurrency(val)}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="net" name="Net Disbursed Salary" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employee Compensation & Payslip Action Table */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-surface-100 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
              Employee Compensation Roster
            </h3>
            <p className="text-xs text-surface-400">Click Generate Payslip to compile downloadable PDF and notify employee</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employee or dept..."
              className="w-full pl-8 pr-3 py-1.5 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-1 focus:ring-brand-500 font-sans"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-950/30 text-[11px] font-bold uppercase tracking-wider text-surface-400 font-mono">
                <th className="py-3.5 px-5">Employee</th>
                <th className="py-3.5 px-5">Department</th>
                <th className="py-3.5 px-5">Basic Salary</th>
                <th className="py-3.5 px-5">Allowances</th>
                <th className="py-3.5 px-5">Deductions</th>
                <th className="py-3.5 px-5">Net Payable</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-100 dark:divide-surface-800/60 font-mono">
              {filteredEmployees.map((emp) => {
                const sal = emp.salary || { basic: 7500, allowances: 1800, deductions: 950, netSalary: 8350 };
                return (
                  <tr key={emp.id} className="hover:bg-surface-50/70 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-4 px-5 font-sans">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                        <div>
                          <span className="font-bold text-surface-900 dark:text-white block">{emp.name}</span>
                          <span className="text-[10px] text-surface-400 font-mono">{emp.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 font-sans font-medium text-surface-700 dark:text-surface-300">
                      {emp.department}
                    </td>

                    <td className="py-4 px-5 text-surface-900 dark:text-white">
                      {formatCurrency(sal.basic)}
                    </td>

                    <td className="py-4 px-5 text-emerald-600 dark:text-emerald-400">
                      +{formatCurrency(sal.allowances)}
                    </td>

                    <td className="py-4 px-5 text-rose-500">
                      -{formatCurrency(sal.deductions)}
                    </td>

                    <td className="py-4 px-5 font-bold text-brand-600 dark:text-brand-400 text-sm">
                      {formatCurrency(sal.netSalary)}
                    </td>

                    <td className="py-4 px-5 text-right font-sans">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Edit2}
                          onClick={() => setEditingSalaryEmp(emp)}
                          className="text-xs"
                        >
                          Edit Salary
                        </Button>

                        <Button
                          variant="primary"
                          size="sm"
                          icon={Download}
                          onClick={() => generatePayslipPdfAction(emp, 'August 2026')}
                          className="text-xs font-bold shadow-glow-sm"
                        >
                          Generate Payslip
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Salary Modal */}
      {editingSalaryEmp && (
        <EditSalaryModal
          isOpen={!!editingSalaryEmp}
          onClose={() => setEditingSalaryEmp(null)}
          employee={editingSalaryEmp}
        />
      )}
    </div>
  );
}