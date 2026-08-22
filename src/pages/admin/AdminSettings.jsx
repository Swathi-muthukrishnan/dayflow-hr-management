// src/pages/admin/AdminSettings.jsx
import React, { useState } from 'react';
import { Settings, RotateCcw, Building, ShieldCheck, Check, Clock, Calendar } from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { Button } from '../../components/common/Button';

export function AdminSettings() {
  const { resetDemoData, showToast } = useHrms();
  const [companyName, setCompanyName] = useState('Dayflow Technologies Inc.');
  const [workHours, setWorkHours] = useState('8.0');
  const [paidLeaveQuota, setPaidLeaveQuota] = useState('18');
  const [sickLeaveQuota, setSickLeaveQuota] = useState('10');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast('Company HR policies and configuration updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800">
        <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
          HR System & Policy Configuration
        </h1>
        <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
          Configure organization work policies, standard shift hours, PTO quotas, and demo state.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: Company Profile */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-100 dark:border-surface-800">
            <Building className="w-5 h-5 text-brand-500" />
            <h3 className="font-bold text-base text-surface-900 dark:text-white">
              Organization Metadata
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold uppercase tracking-wider text-surface-400 font-mono block mb-1">
                Company Legal Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100"
              />
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider text-surface-400 font-mono block mb-1">
                Headquarters Address
              </label>
              <input
                type="text"
                defaultValue="100 Innovation Way, Suite 400, San Francisco, CA"
                className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Attendance & Shift Policies */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-100 dark:border-surface-800">
            <Clock className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-base text-surface-900 dark:text-white">
              Shift & Punctuality Policy
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="font-bold uppercase tracking-wider text-surface-400 block mb-1">
                Standard Daily Shift (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
                className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100"
              />
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider text-surface-400 block mb-1">
                GPS Geofence Perimeter Radius (Meters)
              </label>
              <input
                type="number"
                defaultValue={250}
                className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Annual Leave Allocations */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-100 dark:border-surface-800">
            <Calendar className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base text-surface-900 dark:text-white">
              Annual PTO Allocations (Days/Year)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="font-bold uppercase tracking-wider text-surface-400 block mb-1">
                Paid Annual Leave Quota
              </label>
              <input
                type="number"
                value={paidLeaveQuota}
                onChange={(e) => setPaidLeaveQuota(e.target.value)}
                className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100"
              />
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider text-surface-400 block mb-1">
                Sick & Medical Leave Quota
              </label>
              <input
                type="number"
                value={sickLeaveQuota}
                onChange={(e) => setSickLeaveQuota(e.target.value)}
                className="w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button variant="primary" size="md" type="submit" icon={Check} className="font-bold">
            Save System Policies
          </Button>
        </div>
      </form>

      {/* Section 4: Hackathon Database Reset */}
      <div className="rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-rose-900 dark:text-rose-200">
            Reset Demo Database to Initial Showcase State
          </h3>
          <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5">
            Clears all customized records and restores default 8 employees, sample leaves, and attendance logs.
          </p>
        </div>

        <Button
          variant="danger"
          size="sm"
          icon={RotateCcw}
          onClick={resetDemoData}
          className="font-bold shadow-sm whitespace-nowrap"
        >
          Reset Database
        </Button>
      </div>
    </div>
  );
}