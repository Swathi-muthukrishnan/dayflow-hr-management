// src/pages/employee/EmployeeProfile.jsx
import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Building,
  ShieldCheck,
  CreditCard,
  Edit2,
  Check,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHrms } from '../../context/HrmsContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { formatCurrency } from '../../utils/payrollUtils';

export function EmployeeProfile() {
  const { currentUser } = useAuth();
  const { updateEmployeeProfile } = useHrms();

  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 234-5678');
  const [address, setAddress] = useState(currentUser?.address || '452 Mission Street, Suite 800, San Francisco, CA');

  const handleSave = () => {
    updateEmployeeProfile(currentUser.id, {
      phone,
      address
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header Dossier */}
      <div className="relative overflow-hidden rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-white dark:border-surface-800 shadow-xl"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-surface-900" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
                  {currentUser?.name}
                </h1>
                <Badge variant="primary" size="xs">
                  {currentUser?.id}
                </Badge>
              </div>
              <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                {currentUser?.designation} • {currentUser?.department}
              </p>
              <p className="text-xs text-surface-400 font-mono">
                Joined on {currentUser?.joiningDate || 'March 15, 2023'} • {currentUser?.employmentStatus || 'Full-time'}
              </p>
            </div>
          </div>

          <Button
            variant={isEditing ? 'accent' : 'outline'}
            size="sm"
            icon={isEditing ? Check : Edit2}
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className="text-xs font-bold"
          >
            {isEditing ? 'Save Changes' : 'Edit Contact Info'}
          </Button>
        </div>
      </div>

      {/* Grid of Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Personal & Contact Information (Editable) */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-500" />
              <h3 className="font-bold text-base text-surface-900 dark:text-white">
                Personal Contact Details
              </h3>
            </div>
            <span className="text-[10px] text-surface-400 font-mono">Editable by Employee</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-surface-400 font-mono block text-[10px] uppercase">
                Work Email
              </label>
              <div className="flex items-center gap-2 mt-1 text-surface-900 dark:text-white font-medium">
                <Mail className="w-4 h-4 text-surface-400" />
                <span>{currentUser?.email}</span>
              </div>
            </div>

            <div>
              <label className="text-surface-400 font-mono block text-[10px] uppercase">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full px-3 py-1.5 bg-surface-50 dark:bg-surface-950 border border-brand-500 rounded-xl text-xs font-mono text-surface-900 dark:text-surface-100"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1 text-surface-900 dark:text-white font-medium font-mono">
                  <Phone className="w-4 h-4 text-surface-400" />
                  <span>{phone}</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-surface-400 font-mono block text-[10px] uppercase">
                Residential Address
              </label>
              {isEditing ? (
                <textarea
                  value={address}
                  rows={2}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full px-3 py-1.5 bg-surface-50 dark:bg-surface-950 border border-brand-500 rounded-xl text-xs text-surface-900 dark:text-surface-100 resize-none"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1 text-surface-900 dark:text-white font-medium">
                  <MapPin className="w-4 h-4 text-surface-400 shrink-0" />
                  <span>{address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Job & Organizational Information (Read-only) */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              <h3 className="font-bold text-base text-surface-900 dark:text-white">
                Job & Organization
              </h3>
            </div>
            <span className="text-[10px] text-surface-400 font-mono">Managed by HR</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-surface-400 font-mono block text-[10px] uppercase">
                Department & Unit
              </label>
              <div className="flex items-center gap-2 mt-1 text-surface-900 dark:text-white font-bold">
                <Building className="w-4 h-4 text-surface-400" />
                <span>{currentUser?.department}</span>
              </div>
            </div>

            <div>
              <label className="text-surface-400 font-mono block text-[10px] uppercase">
                Reporting Manager
              </label>
              <div className="flex items-center gap-2 mt-1 text-surface-900 dark:text-white font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>{currentUser?.manager || 'Sarah Chen (Head of People)'}</span>
              </div>
            </div>

            <div>
              <label className="text-surface-400 font-mono block text-[10px] uppercase">
                Work Location Policy
              </label>
              <div className="flex items-center gap-2 mt-1 text-surface-900 dark:text-white font-medium">
                <MapPin className="w-4 h-4 text-surface-400" />
                <span>{currentUser?.location || 'San Francisco, CA (Hybrid)'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Compensation Snapshot */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-base text-surface-900 dark:text-white">
                Salary Structure
              </h3>
            </div>
            <Badge variant="success" size="xs">Active</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800">
              <span className="text-[10px] text-surface-400 uppercase block">Basic Pay</span>
              <span className="font-bold text-surface-900 dark:text-white text-sm">
                {formatCurrency(currentUser?.salary?.basic || 7500)}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800">
              <span className="text-[10px] text-surface-400 uppercase block">Monthly Net</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {formatCurrency(currentUser?.salary?.netSalary || 8350)}
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Verified Documents */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-500" />
              <h3 className="font-bold text-base text-surface-900 dark:text-white">
                HR Documents
              </h3>
            </div>
            <Badge variant="primary" size="xs">3 On File</Badge>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 flex items-center justify-between">
              <span className="font-medium">Employment Agreement & NDA</span>
              <span className="text-[10px] font-mono text-emerald-500 font-bold">Verified ✓</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 flex items-center justify-between">
              <span className="font-medium">Government ID / Passport</span>
              <span className="text-[10px] font-mono text-emerald-500 font-bold">Verified ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}