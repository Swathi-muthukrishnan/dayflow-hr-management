// src/pages/admin/AdminEmployees.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  CreditCard,
  Building,
  Mail,
  Phone,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { formatCurrency } from '../../utils/payrollUtils';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EditSalaryModal } from '../../components/hr/EditSalaryModal';
import { Modal } from '../../components/common/Modal';

export function AdminEmployees() {
  const { employees } = useHrms();
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [editingSalaryEmp, setEditingSalaryEmp] = useState(null);
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const navigate = useNavigate();

  const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Sales', 'Product', 'People Ops', 'Executive'];

  const filteredEmployees = employees.filter((emp) => {
    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      emp.name.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.id.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q);

    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
            Employee Directory & Workforce Management
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Full roster of active headcount, departmental hierarchy, compensation, and profile records.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsAddEmpModalOpen(true)}
          className="font-bold shadow-glow-sm"
        >
          Add Employee
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Department Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                deptFilter === d
                  ? 'bg-brand-600 text-white shadow-sm font-bold'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, or ID..."
            className="w-full pl-8 pr-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-1 focus:ring-brand-500 font-sans"
          />
        </div>
      </div>

      {/* Employees Table */}
      <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-950/30 text-[11px] font-bold uppercase tracking-wider text-surface-400 font-mono">
                <th className="py-3.5 px-5">Employee</th>
                <th className="py-3.5 px-5">Department & Role</th>
                <th className="py-3.5 px-5">Attendance %</th>
                <th className="py-3.5 px-5">Leave Balance</th>
                <th className="py-3.5 px-5">Monthly Net Salary</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-100 dark:divide-surface-800/60">
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-surface-50/70 dark:hover:bg-surface-800/40 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/admin/employees/${emp.id}`)}
                >
                  {/* Employee Avatar & Name */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-9 h-9 rounded-2xl object-cover border border-surface-200 dark:border-surface-700 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-surface-900 dark:text-white block group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {emp.name}
                        </span>
                        <span className="text-[10px] text-surface-400 font-mono">{emp.id} • {emp.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Department & Role */}
                  <td className="py-4 px-5">
                    <span className="font-semibold text-surface-900 dark:text-white block">{emp.designation}</span>
                    <span className="text-xs text-surface-400 font-mono">{emp.department}</span>
                  </td>

                  {/* Attendance */}
                  <td className="py-4 px-5 font-mono">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {emp.attendanceRate || 95}%
                    </span>
                  </td>

                  {/* Leave Balance */}
                  <td className="py-4 px-5 font-mono">
                    <span>{emp.leaveBalance?.paid || 12} Paid Left</span>
                  </td>

                  {/* Monthly Net Salary */}
                  <td className="py-4 px-5 font-mono font-bold text-surface-900 dark:text-white">
                    {formatCurrency(emp.salary?.netSalary || 8350)}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    <Badge variant="success" size="xs">Active</Badge>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/employees/${emp.id}`)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-brand-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        title="View Full Profile Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setEditingSalaryEmp(emp)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-emerald-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        title="Adjust Salary"
                      >
                        <CreditCard className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Adjustment Modal */}
      {editingSalaryEmp && (
        <EditSalaryModal
          isOpen={!!editingSalaryEmp}
          onClose={() => setEditingSalaryEmp(null)}
          employee={editingSalaryEmp}
        />
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddEmpModalOpen}
        onClose={() => setIsAddEmpModalOpen(false)}
      />
    </div>
  );
}

function AddEmployeeModal({ isOpen, onClose }) {
  const { employees } = useHrms();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [designation, setDesignation] = useState('Software Engineer');

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Employee"
      subtitle="Register a new workforce member onto Dayflow HRMS"
      maxWidth="max-w-md"
    >
      <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4 text-xs">
        <div>
          <label className="font-bold uppercase tracking-wider text-surface-400 font-mono block mb-1">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jordan Lee"
            className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="font-bold uppercase tracking-wider text-surface-400 font-mono block mb-1">Work Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jordan.lee@dayflow.io"
            className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold uppercase tracking-wider text-surface-400 font-mono block mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm"
            >
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Product">Product</option>
              <option value="People Ops">People Ops</option>
            </select>
          </div>

          <div>
            <label className="font-bold uppercase tracking-wider text-surface-400 font-mono block mb-1">Designation</label>
            <input
              type="text"
              required
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-100 dark:border-surface-800">
          <Button variant="secondary" size="sm" type="button" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" type="submit" className="font-bold">Register Employee</Button>
        </div>
      </form>
    </Modal>
  );
}