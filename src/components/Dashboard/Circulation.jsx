import React, { useState } from 'react';
import {
  ArrowLeftRight,
  BookCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  BookOpen,
  DollarSign,
  Plus,
  RefreshCw,
  Search
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../common/Button';
import { Badge, StatusBadge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { SearchBar } from '../common/SearchBar';
import { EmptyState } from '../common/EmptyState';

export function CirculationTab() {
  const {
    books,
    members,
    loans,
    issueBook,
    returnBook,
    renewBook,
    showToast
  } = useLibrary();

  const [activeDeskView, setActiveDeskView] = useState('loans'); // 'loans', 'issue', 'return'
  const [loanSearchQuery, setLoanSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Issue Form State
  const [issuePatronId, setIssuePatronId] = useState(members[0]?.id || '');
  const [issueBookId, setIssueBookId] = useState(books[0]?.id || '');
  const [issueDurationDays, setIssueDurationDays] = useState(14);
  const [isIssuing, setIsIssuing] = useState(false);

  // Return Modal State
  const [returnModalLoan, setReturnModalLoan] = useState(null);
  const [returnCondition, setReturnCondition] = useState('Good');
  const [customDamageFine, setCustomDamageFine] = useState(0);
  const [isReturning, setIsReturning] = useState(false);

  // Filtered Loans
  const filteredLoans = loans.filter((loan) => {
    const q = loanSearchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      loan.bookTitle.toLowerCase().includes(q) ||
      loan.patronName.toLowerCase().includes(q) ||
      loan.id.toLowerCase().includes(q);

    const matchesStatus =
      selectedStatusFilter === 'All' || loan.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    setIsIssuing(true);
    try {
      await issueBook({
        bookId: issueBookId,
        patronId: issuePatronId,
        returnDays: issueDurationDays
      });
      setActiveDeskView('loans');
    } catch (err) {
      // Toast handled in context
    } finally {
      setIsIssuing(false);
    }
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    if (!returnModalLoan) return;
    setIsReturning(true);
    try {
      await returnBook({
        loanId: returnModalLoan.id,
        condition: returnCondition,
        damageFine: customDamageFine
      });
      setReturnModalLoan(null);
    } catch (err) {
      // Toast handled
    } finally {
      setIsReturning(false);
    }
  };

  const handleQuickRenew = async (loanId) => {
    try {
      await renewBook(loanId);
    } catch (err) {
      // Toast handled
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Desk Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Circulation Desk
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Real-time book issuance, returns terminal, renewals, and live loan tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeDeskView === 'loans' ? 'primary' : 'secondary'}
            size="sm"
            icon={ArrowLeftRight}
            onClick={() => setActiveDeskView('loans')}
          >
            Loans Ledger ({loans.length})
          </Button>
          <Button
            variant={activeDeskView === 'issue' ? 'primary' : 'secondary'}
            size="sm"
            icon={Plus}
            onClick={() => setActiveDeskView('issue')}
          >
            Issue Book
          </Button>
        </div>
      </div>

      {/* VIEW 1: ISSUE BOOK TERMINAL */}
      {activeDeskView === 'issue' && (
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8 shadow-md max-w-3xl mx-auto">
          <div className="flex items-center gap-3 pb-6 border-b border-surface-100 dark:border-surface-800">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-glow-sm">
              <BookCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-surface-900 dark:text-white">
                Issue Circulation Loan Terminal
              </h3>
              <p className="text-xs text-surface-500">
                Grant new book access to patron and update cloud inventory ledger.
              </p>
            </div>
          </div>

          <form onSubmit={handleIssueSubmit} className="mt-6 space-y-6">
            {/* Select Patron */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-2">
                1. Select Registered Patron
              </label>
              <select
                value={issuePatronId}
                onChange={(e) => setIssuePatronId(e.target.value)}
                className="w-full p-3 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.department} • {m.role}) — {m.activeLoansCount}/{m.maxLoans} active loans
                  </option>
                ))}
              </select>
            </div>

            {/* Select Book */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-2">
                2. Select Available Book Copy
              </label>
              <select
                value={issueBookId}
                onChange={(e) => setIssueBookId(e.target.value)}
                className="w-full p-3 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500"
              >
                {books.map((b) => (
                  <option key={b.id} value={b.id} disabled={b.availableCopies <= 0}>
                    {b.title} — {b.availableCopies} left in stock ({b.shelfLocation})
                  </option>
                ))}
              </select>
            </div>

            {/* Loan Duration */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-2">
                3. Loan Duration Policy
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { days: 7, label: '7 Days (Short Course)' },
                  { days: 14, label: '14 Days (Standard)' },
                  { days: 28, label: '28 Days (Faculty Extended)' }
                ].map((tier) => (
                  <button
                    key={tier.days}
                    type="button"
                    onClick={() => setIssueDurationDays(tier.days)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      issueDurationDays === tier.days
                        ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setActiveDeskView('loans')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                size="md"
                isLoading={isIssuing}
                className="font-bold px-6 shadow-glow-sm"
              >
                Confirm & Issue Book
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW 2: LOANS LEDGER TABLE */}
      {activeDeskView === 'loans' && (
        <div className="space-y-4">
          {/* Filter / Search bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-80">
              <SearchBar
                value={loanSearchQuery}
                onChange={setLoanSearchQuery}
                placeholder="Search loans by patron or book..."
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
              {['All', 'active', 'due_soon', 'overdue', 'returned'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-colors shrink-0 ${
                    selectedStatusFilter === status
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200'
                  }`}
                >
                  {status === 'due_soon' ? 'Due Soon' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Loans Table */}
          {filteredLoans.length === 0 ? (
            <EmptyState
              icon={ArrowLeftRight}
              title="No circulation loan records found"
              description="No loans match your current search or status filter."
            />
          ) : (
            <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-50 dark:bg-surface-950 text-surface-500 font-mono uppercase border-b border-surface-200 dark:border-surface-800">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Loan ID</th>
                    <th className="py-3.5 px-4 font-bold">Book Title</th>
                    <th className="py-3.5 px-4 font-bold">Patron Member</th>
                    <th className="py-3.5 px-4 font-bold">Issued / Due Date</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold">Fine Accrued</th>
                    <th className="py-3.5 px-4 text-right font-bold">Circulation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                  {filteredLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-surface-50/50 dark:hover:bg-surface-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-surface-600 dark:text-surface-400">
                        {loan.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={loan.bookCover}
                            alt={loan.bookTitle}
                            className="w-8 h-12 object-cover rounded shadow-sm shrink-0"
                          />
                          <span className="font-bold text-surface-900 dark:text-white max-w-[180px] sm:max-w-xs truncate block">
                            {loan.bookTitle}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-surface-900 dark:text-white">
                          {loan.patronName}
                        </div>
                        <div className="text-[10px] text-surface-400 font-mono">
                          {loan.patronId}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <div>Issued: {loan.issueDate}</div>
                        <div className={`font-bold ${loan.status === 'overdue' ? 'text-rose-600 dark:text-rose-400' : 'text-surface-600 dark:text-surface-300'}`}>
                          Due: {loan.dueDate}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={loan.status} />
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold">
                        {loan.fineAmount > 0 ? (
                          <span className="text-rose-600 dark:text-rose-400">
                            ${loan.fineAmount.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-surface-400">$0.00</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {loan.status !== 'returned' ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={RotateCcw}
                              onClick={() => handleQuickRenew(loan.id)}
                              className="text-[11px] py-1 px-2.5"
                              title="Extend due date by 14 days"
                            >
                              Renew ({loan.renewCount || 0}/2)
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              icon={CheckCircle2}
                              onClick={() => setReturnModalLoan(loan)}
                              className="text-[11px] py-1 px-2.5 font-bold"
                            >
                              Check-In
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-surface-400 font-mono">
                            Returned on {loan.returnDate}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* RETURN / CHECK-IN MODAL */}
      {returnModalLoan && (
        <Modal
          isOpen={true}
          onClose={() => setReturnModalLoan(null)}
          title={`Check-In Return: ${returnModalLoan.bookTitle}`}
          subtitle={`Patron: ${returnModalLoan.patronName} (Loan #${returnModalLoan.id})`}
        >
          <form onSubmit={handleReturnSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-2">
                Physical Book Return Condition
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Good', 'Minor Wear', 'Water Damage', 'Severe Wear'].map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setReturnCondition(cond)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      returnCondition === cond
                        ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950 text-surface-600'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-1">
                Additional Damage Assessment Fine ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={customDamageFine}
                onChange={(e) => setCustomDamageFine(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-mono"
              />
              <span className="text-[11px] text-surface-400 mt-1 block">
                Overdue fines (if any) will be calculated automatically at $0.75/day.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setReturnModalLoan(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                size="sm"
                isLoading={isReturning}
                className="font-bold px-5"
              >
                Complete Return & Check-In
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}