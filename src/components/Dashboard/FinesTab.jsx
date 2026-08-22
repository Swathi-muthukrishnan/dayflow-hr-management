import React, { useState } from 'react';
import {
  DollarSign,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter,
  ShieldCheck,
  RotateCcw,
  Receipt
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../common/Button';
import { Badge, StatusBadge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { SearchBar } from '../common/SearchBar';
import { EmptyState } from '../common/EmptyState';

export function FinesTab() {
  const { fines, settleFine, waiveFine, stats, showToast } = useLibrary();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReceiptFine, setSelectedReceiptFine] = useState(null);
  const [waiveModalFine, setWaiveModalFine] = useState(null);
  const [waiveReason, setWaiveReason] = useState('Academic Grace Period');

  const filteredFines = fines.filter((fine) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      fine.patronName.toLowerCase().includes(q) ||
      fine.bookTitle.toLowerCase().includes(q) ||
      fine.id.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === 'All' || fine.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleConfirmWaive = async () => {
    if (!waiveModalFine) return;
    await waiveFine(waiveModalFine.id, waiveReason);
    setWaiveModalFine(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Fines & Revenue Ledger
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Track overdue charges, damage recovery fees, digital settlements, and institutional waivers.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase text-surface-400">Total Pending Fines</span>
          <div className="text-3xl font-extrabold font-mono text-rose-600 dark:text-rose-400 mt-1">
            ${stats.totalFinesPending.toFixed(2)}
          </div>
          <span className="text-[11px] text-surface-500">Uncollected student balances</span>
        </div>

        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase text-surface-400">Total Settled / Paid</span>
          <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            ${stats.totalFinesCollected.toFixed(2)}
          </div>
          <span className="text-[11px] text-surface-500">Recovered this semester</span>
        </div>

        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase text-surface-400">Fine Recovery Rate</span>
          <div className="text-3xl font-extrabold font-mono text-brand-600 dark:text-brand-400 mt-1">
            87.4%
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ +32% vs manual legacy</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search fines by patron, book, or fine ID..."
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
          {['All', 'pending', 'paid', 'waived'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-colors shrink-0 ${
                statusFilter === status
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Fines Table */}
      {filteredFines.length === 0 ? (
        <EmptyState
          icon={DollarSign}
          title="No fine records found"
          description="There are no fines matching your search criteria."
        />
      ) : (
        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 dark:bg-surface-950 text-surface-500 font-mono uppercase border-b border-surface-200 dark:border-surface-800">
              <tr>
                <th className="py-3.5 px-4 font-bold">Fine ID</th>
                <th className="py-3.5 px-4 font-bold">Patron Member</th>
                <th className="py-3.5 px-4 font-bold">Book Title / Reason</th>
                <th className="py-3.5 px-4 font-bold">Amount</th>
                <th className="py-3.5 px-4 font-bold">Date Assessed</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 text-right font-bold">Ledger Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {filteredFines.map((fine) => (
                <tr key={fine.id} className="hover:bg-surface-50/50 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-surface-600 dark:text-surface-400">
                    {fine.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-surface-900 dark:text-white block">
                      {fine.patronName}
                    </span>
                    <span className="text-[10px] text-surface-400 font-mono">
                      {fine.patronId}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-surface-900 dark:text-white block truncate max-w-[200px]">
                      {fine.bookTitle}
                    </span>
                    <span className="text-[11px] text-surface-500">
                      {fine.reason} {fine.waiveReason && `(${fine.waiveReason})`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-sm text-surface-900 dark:text-white">
                    ${fine.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-surface-500">
                    {fine.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={fine.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedReceiptFine(fine)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-brand-600 hover:bg-surface-100 dark:hover:bg-surface-800"
                        title="View Official Receipt"
                      >
                        <Receipt className="w-4 h-4" />
                      </button>

                      {fine.status === 'pending' && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setWaiveModalFine(fine)}
                            className="text-[11px] py-1 px-2.5 text-surface-600"
                          >
                            Waive
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => settleFine(fine.id)}
                            className="text-[11px] py-1 px-2.5 font-bold"
                          >
                            Settle / Pay
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL 1: WAIVE FINE */}
      {waiveModalFine && (
        <Modal
          isOpen={true}
          onClose={() => setWaiveModalFine(null)}
          title={`Waive Fine for ${waiveModalFine.patronName}`}
          subtitle={`Amount: $${waiveModalFine.amount.toFixed(2)} • Fine #${waiveModalFine.id}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-2">
                Select Authorized Institutional Waiver Reason
              </label>
              <select
                value={waiveReason}
                onChange={(e) => setWaiveReason(e.target.value)}
                className="w-full p-3 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-xl text-xs font-semibold"
              >
                <option value="Academic Grace Period">Academic Grace Period (Exam Week)</option>
                <option value="Department Head Exemption">Department Head Exemption</option>
                <option value="Verified System Glitch">Verified System Scanner Glitch</option>
                <option value="Financial Aid Hardship">Financial Aid Hardship Waiver</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
              <Button variant="secondary" size="sm" onClick={() => setWaiveModalFine(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmWaive} className="font-bold">
                Authorize Waiver
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 2: OFFICIAL FINE RECEIPT */}
      {selectedReceiptFine && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedReceiptFine(null)}
          title="Institutional Receipt of Transaction"
          maxWidth="max-w-md"
        >
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 font-mono text-xs space-y-4">
              <div className="text-center pb-3 border-b border-surface-200 dark:border-surface-800">
                <span className="font-extrabold text-sm text-surface-900 dark:text-white block">
                  LIBFLOW CIRCULATION LEDGER
                </span>
                <span className="text-[10px] text-surface-400">
                  OFFICIAL AUDIT PROOF #{selectedReceiptFine.id}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-surface-400">Patron:</span>
                  <span className="font-bold text-surface-900 dark:text-white">{selectedReceiptFine.patronName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-400">Item:</span>
                  <span className="font-bold text-surface-900 dark:text-white truncate max-w-[180px]">{selectedReceiptFine.bookTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-400">Assessment:</span>
                  <span>{selectedReceiptFine.reason}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-400">Status:</span>
                  <span className="uppercase font-bold text-emerald-600">{selectedReceiptFine.status}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-200 dark:border-surface-800 flex justify-between text-sm font-extrabold">
                <span>TOTAL AMOUNT:</span>
                <span>${selectedReceiptFine.amount.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelectedReceiptFine(null)}>
                Close Receipt
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}