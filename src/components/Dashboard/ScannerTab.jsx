import React, { useState } from 'react';
import {
  Scan,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  User,
  Sparkles,
  ArrowRight,
  Barcode
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../common/Button';
import { Badge, StatusBadge } from '../common/Badge';
import { BarcodeSvg } from '../common/BarcodeSvg';

export function ScannerTerminal() {
  const { books, members, loans, issueBook, returnBook, showToast } = useLibrary();

  const [inputCode, setInputCode] = useState('');
  const [selectedPatronId, setSelectedPatronId] = useState(members[0]?.id || 'MEM-8001');
  const [scanMode, setScanMode] = useState('checkout'); // 'checkout' or 'return'
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState(null);

  const handleExecuteScan = async (codeToScan) => {
    const code = codeToScan || inputCode;
    if (!code) {
      showToast('Please enter or select a barcode / ISBN to scan', 'warning');
      return;
    }

    setIsScanning(true);
    setLastScanResult(null);

    try {
      // Simulate hardware scanning laser latency
      await new Promise(r => setTimeout(r, 600));

      if (scanMode === 'checkout') {
        // Find book by ISBN or ID
        const matchedBook = books.find(
          b => b.isbn.replace(/[^0-9X]/gi, '') === code.replace(/[^0-9X]/gi, '') || b.id === code || b.title.toLowerCase().includes(code.toLowerCase())
        );

        if (!matchedBook) {
          throw new Error(`No book found matching barcode "${code}".`);
        }

        const loan = await issueBook({
          bookId: matchedBook.id,
          patronId: selectedPatronId,
          returnDays: 14
        });

        setLastScanResult({
          type: 'checkout',
          title: loan.bookTitle,
          patron: loan.patronName,
          dueDate: loan.dueDate,
          loanId: loan.id,
          timestamp: new Date().toLocaleTimeString()
        });
      } else {
        // Return Mode: Find active loan matching book
        const activeLoan = loans.find(
          l => (l.status === 'active' || l.status === 'overdue' || l.status === 'due_soon') &&
               (l.bookId === code || l.id === code || l.bookTitle.toLowerCase().includes(code.toLowerCase()))
        );

        if (!activeLoan) {
          throw new Error(`No active loan found for scanned item "${code}".`);
        }

        const result = await returnBook({
          loanId: activeLoan.id,
          condition: 'Good',
          damageFine: 0
        });

        setLastScanResult({
          type: 'return',
          title: activeLoan.bookTitle,
          patron: activeLoan.patronName,
          fine: result.fine,
          loanId: activeLoan.id,
          timestamp: new Date().toLocaleTimeString()
        });
      }
      setInputCode('');
    } catch (err) {
      showToast(err.message || 'Scan processing failed', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            High-Frequency RFID & Barcode Terminal
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Simulate hardware laser pass, optical barcode decoding, and multi-tag RFID checkouts.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-1">
          <button
            onClick={() => setScanMode('checkout')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              scanMode === 'checkout'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-surface-500 hover:text-surface-900 dark:hover:text-white'
            }`}
          >
            Issue / Check-Out
          </button>
          <button
            onClick={() => setScanMode('return')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              scanMode === 'return'
                ? 'bg-accent-600 text-white shadow-sm'
                : 'text-surface-500 hover:text-surface-900 dark:hover:text-white'
            }`}
          >
            Return / Check-In
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Interactive Laser Scanner Viewport */}
        <div className="lg:col-span-7 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8 shadow-md">
          {/* Target Scanner Window */}
          <div className="relative rounded-2xl bg-surface-950 border border-surface-800 h-64 flex flex-col items-center justify-center overflow-hidden shadow-inner">
            {/* Animated Laser Beam */}
            <div className="laser-line" />

            {/* Corner Target Brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-rose-500 rounded-tl" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-rose-500 rounded-tr" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-rose-500 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-rose-500 rounded-br" />

            {/* Viewport Center Graphic */}
            <div className="flex flex-col items-center text-center p-4 z-10">
              <Scan className="w-12 h-12 text-rose-500/80 animate-pulse mb-3" />
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                {scanMode === 'checkout' ? 'READY FOR RFID ISSUE SCAN' : 'READY FOR RETURN INGESTION'}
              </span>
              <span className="text-[11px] text-surface-400 font-mono mt-1">
                Point laser or click sample barcodes below
              </span>
            </div>
          </div>

          {/* Form & Manual Input */}
          <div className="mt-6 space-y-4">
            {scanMode === 'checkout' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-1.5">
                  Target Patron:
                </label>
                <select
                  value={selectedPatronId}
                  onChange={(e) => setSelectedPatronId(e.target.value)}
                  className="w-full p-3 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-xl text-xs font-semibold"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.department} • {m.tier}) — {m.activeLoansCount}/{m.maxLoans} Loans
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-1.5">
                Barcode / ISBN / Tag Serial:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleExecuteScan()}
                  placeholder="Scan or type barcode (e.g. 978-0132350884)..."
                  className="flex-1 px-4 py-3 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-xl font-mono text-xs focus:ring-2 focus:ring-brand-500"
                />
                <Button
                  variant="primary"
                  isLoading={isScanning}
                  onClick={() => handleExecuteScan()}
                  className="font-bold px-6"
                >
                  ⚡ Trigger Scan
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 cols: 1-Click Sample Barcode Library */}
        <div className="lg:col-span-5 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
              <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                1-Click Preset Barcode Stickers
              </h3>
              <Badge variant="primary" size="sm">Click to Scan</Badge>
            </div>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-2 mb-4">
              Click any barcode card below to simulate physical laser scanning:
            </p>

            <div className="space-y-3">
              {books.slice(0, 3).map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    setInputCode(b.isbn);
                    handleExecuteScan(b.isbn);
                  }}
                  className="p-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50/70 dark:bg-surface-950 hover:border-brand-500 cursor-pointer transition-all hover:shadow-sm flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-surface-900 dark:text-white truncate block group-hover:text-brand-600">
                      {b.title}
                    </span>
                    <span className="font-mono text-[10px] text-surface-400">
                      {b.isbn} • {b.shelfLocation}
                    </span>
                  </div>
                  <BarcodeSvg value={b.isbn} height={26} className="w-28 shrink-0 bg-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Last Scan Live Telemetry Receipt */}
          {lastScanResult && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 animate-scaleUp text-xs font-mono">
              <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-300 font-bold pb-2 border-b border-emerald-200 dark:border-emerald-800">
                <span>✓ {lastScanResult.type.toUpperCase()} COMPLETED (0.58s)</span>
                <span>{lastScanResult.timestamp}</span>
              </div>
              <div className="mt-2 text-surface-900 dark:text-white font-bold">
                {lastScanResult.title}
              </div>
              <div className="text-surface-600 dark:text-surface-300 mt-1">
                Patron: {lastScanResult.patron} • Ticket #{lastScanResult.loanId}
              </div>
              {lastScanResult.dueDate && (
                <div className="text-brand-600 dark:text-brand-400 font-bold mt-1">
                  Due Return Date: {lastScanResult.dueDate}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}