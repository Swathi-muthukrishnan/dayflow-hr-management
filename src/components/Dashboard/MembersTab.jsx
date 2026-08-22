import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  CreditCard,
  Mail,
  BookOpen,
  DollarSign,
  QrCode,
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { SearchBar } from '../common/SearchBar';
import { BarcodeSvg } from '../common/BarcodeSvg';

export function MembersTab() {
  const { members, addMember, loans, fines, showToast } = useLibrary();

  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedMemberCard, setSelectedMemberCard] = useState(null);

  // Form State
  const [newMemberData, setNewMemberData] = useState({
    name: '',
    email: '',
    role: 'Student',
    department: 'Computer Science',
    studentId: '',
    tier: 'Standard',
    maxLoans: 5
  });

  const filteredMembers = members.filter((m) => {
    const q = memberSearchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.studentId.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q);

    const matchesRole =
      selectedRoleFilter === 'All' || m.role === selectedRoleFilter;

    return matchesSearch && matchesRole;
  });

  const handleAddMemberSubmit = async (e) => {
    e.preventDefault();
    if (!newMemberData.name || !newMemberData.email) {
      showToast('Name and Email are required', 'warning');
      return;
    }
    await addMember(newMemberData);
    setIsAddMemberOpen(false);
    setNewMemberData({
      name: '',
      email: '',
      role: 'Student',
      department: 'Computer Science',
      studentId: '',
      tier: 'Standard',
      maxLoans: 5
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Patron & Member Directory
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Manage student, faculty, and research scholar digital passes & borrowing quotas.
          </p>
        </div>

        <Button
          variant="gradient"
          size="sm"
          icon={UserPlus}
          onClick={() => setIsAddMemberOpen(true)}
          className="font-bold shadow-sm"
        >
          Register New Patron
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar
            value={memberSearchQuery}
            onChange={setMemberSearchQuery}
            placeholder="Search patrons by name, email, or ID..."
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
          {['All', 'Student', 'Faculty', 'Researcher'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRoleFilter(role)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
                selectedRoleFilter === role
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="group rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-brand-500/30"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-surface-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[11px] text-surface-500 font-mono">
                      {member.studentId} • {member.role}
                    </p>
                  </div>
                </div>

                <Badge variant={member.role === 'Faculty' ? 'purple' : 'primary'} size="sm">
                  {member.tier}
                </Badge>
              </div>

              <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between text-surface-600 dark:text-surface-400">
                  <span>Department</span>
                  <span className="font-semibold text-surface-900 dark:text-white">{member.department}</span>
                </div>
                <div className="flex items-center justify-between text-surface-600 dark:text-surface-400">
                  <span>Active Loans Quota</span>
                  <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
                    {member.activeLoansCount} / {member.maxLoans} Books
                  </span>
                </div>
                <div className="flex items-center justify-between text-surface-600 dark:text-surface-400">
                  <span>Unpaid Fines</span>
                  <span className={`font-mono font-bold ${member.finesBalance > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600'}`}>
                    ${member.finesBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-surface-100 dark:border-surface-800/80">
              <Button
                variant="secondary"
                size="sm"
                icon={CreditCard}
                onClick={() => setSelectedMemberCard(member)}
                className="w-full text-xs font-semibold"
              >
                View Digital Library Pass
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: ADD MEMBER */}
      <Modal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        title="Register New Library Patron"
        subtitle="Create student or faculty digital profile with assigned borrowing quota."
      >
        <form onSubmit={handleAddMemberSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={newMemberData.name}
                onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                placeholder="e.g. Jordan Miller"
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Institutional Email *
              </label>
              <input
                type="email"
                required
                value={newMemberData.email}
                onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })}
                placeholder="jordan.m@university.edu"
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Role
              </label>
              <select
                value={newMemberData.role}
                onChange={(e) => setNewMemberData({ ...newMemberData, role: e.target.value })}
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs"
              >
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Researcher">Researcher</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Department
              </label>
              <input
                type="text"
                value={newMemberData.department}
                onChange={(e) => setNewMemberData({ ...newMemberData, department: e.target.value })}
                placeholder="e.g. Computer Science"
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">
                Max Loan Limit
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={newMemberData.maxLoans}
                onChange={(e) => setNewMemberData({ ...newMemberData, maxLoans: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAddMemberOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="font-bold"
            >
              Register Patron
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: DIGITAL LIBRARY PASS */}
      {selectedMemberCard && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedMemberCard(null)}
          title="Digital Patron Smart Pass"
          maxWidth="max-w-md"
        >
          <div className="space-y-6">
            {/* Digital Pass Card */}
            <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-700 via-indigo-900 to-slate-950 text-white p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-300" />
                  <span className="font-extrabold text-sm tracking-tight">LibFlow SmartPass</span>
                </div>
                <Badge variant="primary" size="sm" className="bg-white/10 border-white/20 text-white">
                  {selectedMemberCard.tier}
                </Badge>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <img
                  src={selectedMemberCard.avatar}
                  alt={selectedMemberCard.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shadow-md"
                />
                <div>
                  <h3 className="text-lg font-bold">{selectedMemberCard.name}</h3>
                  <p className="text-xs text-brand-200 font-mono">{selectedMemberCard.studentId}</p>
                  <p className="text-xs text-brand-300 mt-0.5">{selectedMemberCard.department}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-brand-300 text-[10px] uppercase block">RFID Tag Serial</span>
                  <span className="font-mono font-bold">{selectedMemberCard.rfidTag}</span>
                </div>
                <div>
                  <span className="text-brand-300 text-[10px] uppercase block">Active Loans</span>
                  <span className="font-mono font-bold">{selectedMemberCard.activeLoansCount} / {selectedMemberCard.maxLoans} Active</span>
                </div>
              </div>

              {/* Barcode in card */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col items-center">
                <BarcodeSvg value={selectedMemberCard.id} height={32} className="w-full bg-white/90" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedMemberCard(null)}
              >
                Close Pass
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}