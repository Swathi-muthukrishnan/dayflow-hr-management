// src/pages/employee/EmployeePayroll.jsx
import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import {
  CreditCard,
  Download,
  Eye,
  CheckCircle2,
  FileText,
  DollarSign,
  Building,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHrms } from '../../context/HrmsContext';
import { formatCurrency } from '../../utils/payrollUtils';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { PayslipPreviewModal } from '../../components/hr/PayslipPreviewModal';

export function EmployeePayroll() {
  const { currentUser } = useAuth();
  const { payslips, generatePayslipPdfAction } = useHrms();
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const salary = currentUser?.salary || {
    basic: 7500,
    allowances: 1800,
    deductions: 950,
    netSalary: 8350
  };

  const chartData = [
    { name: 'Basic Pay', value: salary.basic * 0.7, color: '#4f46e5' },
    { name: 'House Rent Allowance (HRA)', value: salary.basic * 0.2, color: '#6366f1' },
    { name: 'Special Allowance & Bonus', value: salary.allowances, color: '#10b981' },
    { name: 'Deductions (TDS, PF, Tax)', value: salary.deductions, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
            Payroll & Digital Payslips
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Transparent salary breakdown, tax deductions, and downloadable official PDF payslips.
          </p>
        </div>

        <Button
          variant="gradient"
          size="md"
          icon={Download}
          onClick={() => generatePayslipPdfAction(currentUser, 'August 2026')}
          className="font-bold shadow-glow-sm"
        >
          Download Latest Payslip (PDF)
        </Button>
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Net Pay"
          value={formatCurrency(salary.netSalary)}
          subtitle="Credited to Bank Account"
          icon={CreditCard}
          color="brand"
        />
        <StatCard
          title="Basic Earnings"
          value={formatCurrency(salary.basic)}
          subtitle="Base compensation"
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Allowances & Bonus"
          value={formatCurrency(salary.allowances)}
          subtitle="HRA, travel & perks"
          icon={Building}
          color="amber"
        />
        <StatCard
          title="Total Deductions"
          value={`-${formatCurrency(salary.deductions)}`}
          subtitle="PF, 401(k), & Income Tax"
          icon={ShieldCheck}
          color="rose"
        />
      </div>

      {/* Salary Breakdown Chart & Banking Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recharts Donut Breakdown (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                Earnings vs Deductions Breakdown
              </h3>
              <p className="text-xs text-surface-400">Component distribution of monthly gross payout</p>
            </div>
            <Badge variant="primary" size="xs">
              Annual CTC: {formatCurrency((salary.basic + salary.allowances) * 12)}
            </Badge>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Banking & Tax Credentials (1 col) */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-surface-100 dark:border-surface-800 flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
              Disbursement Details
            </h3>
            <Badge variant="success" size="xs">Verified</Badge>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 space-y-1">
              <span className="text-[10px] text-surface-400 uppercase block">Bank Account</span>
              <span className="font-bold text-surface-900 dark:text-white text-sm">
                Silicon Valley Bank •••• 4912
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 space-y-1">
              <span className="text-[10px] text-surface-400 uppercase block">Tax Identification</span>
              <span className="font-bold text-surface-900 dark:text-white text-sm">
                SSN/EIN: TX-8921-948
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 space-y-1">
              <span className="text-[10px] text-surface-400 uppercase block">Payment Schedule</span>
              <span className="font-bold text-surface-900 dark:text-white text-sm">
                Monthly • Last Business Day
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Digital Payslips Table */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-surface-100 dark:border-surface-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
              Historical Payslips Archive
            </h3>
            <p className="text-xs text-surface-400">View statement breakdowns or download verified PDF copies</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-950/30 text-[11px] font-bold uppercase tracking-wider text-surface-400 font-mono">
                <th className="py-3.5 px-5">Statement Reference</th>
                <th className="py-3.5 px-5">Pay Period</th>
                <th className="py-3.5 px-5">Disbursement Date</th>
                <th className="py-3.5 px-5">Gross Pay</th>
                <th className="py-3.5 px-5">Deductions</th>
                <th className="py-3.5 px-5">Net Disbursed</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-100 dark:divide-surface-800/60 font-mono">
              {payslips.map((slip) => (
                <tr key={slip.id} className="hover:bg-surface-50/70 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-brand-600 dark:text-brand-400">
                    {slip.id}
                  </td>
                  <td className="py-3.5 px-5 font-sans font-medium text-surface-900 dark:text-white">
                    {slip.period}
                  </td>
                  <td className="py-3.5 px-5 text-surface-500 dark:text-surface-400">
                    {slip.payDate}
                  </td>
                  <td className="py-3.5 px-5 text-surface-900 dark:text-white">
                    {formatCurrency(slip.basic + slip.allowances)}
                  </td>
                  <td className="py-3.5 px-5 text-rose-500">
                    -{formatCurrency(slip.deductions)}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(slip.netSalary)}
                  </td>
                  <td className="py-3.5 px-5">
                    <Badge variant="success" size="xs">Paid</Badge>
                  </td>
                  <td className="py-3.5 px-5 text-right font-sans">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedPayslip(slip)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-brand-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        title="View Statement"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => generatePayslipPdfAction(currentUser, slip.period)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-emerald-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        title="Download PDF Payslip"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* In-App Payslip Preview Modal */}
      {selectedPayslip && (
        <PayslipPreviewModal
          isOpen={!!selectedPayslip}
          onClose={() => setSelectedPayslip(null)}
          payslip={selectedPayslip}
          employee={currentUser}
        />
      )}
    </div>
  );
}