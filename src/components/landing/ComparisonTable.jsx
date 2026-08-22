import React from 'react';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export function ComparisonTable() {
  const comparisonData = [
    {
      feature: 'Multi-Item RFID Batch Checkouts (< 1.2s)',
      libflow: true,
      koha: 'Partial / Hardware Lock-in',
      destiny: 'Slow / 1-by-1',
      manual: false
    },
    {
      feature: 'Real-Time OpenLibrary ISBN Auto-Ingestion',
      libflow: true,
      koha: 'Slow Z39.50 Protocols',
      destiny: 'Paid Addon Only',
      manual: false
    },
    {
      feature: 'Automated WhatsApp & Email Overdue Nudges',
      libflow: true,
      koha: false,
      destiny: 'Email only (Delayed)',
      manual: false
    },
    {
      feature: 'Vector AI Semantic Research Discovery',
      libflow: true,
      koha: false,
      destiny: false,
      manual: false
    },
    {
      feature: 'Live Shelf Heatmaps & Space Occupancy',
      libflow: true,
      koha: false,
      destiny: false,
      manual: false
    },
    {
      feature: 'Modern Responsive SaaS UX (Desktop & Mobile)',
      libflow: true,
      koha: 'Legacy 2000s Web UI',
      destiny: 'Desktop Heavy',
      manual: false
    },
    {
      feature: 'Pluggable REST/GraphQL Service Gateway',
      libflow: true,
      koha: 'Complex Perl Backend',
      destiny: 'Proprietary Closed API',
      manual: false
    }
  ];

  return (
    <section id="comparison" className="py-20 lg:py-28 bg-surface-100/40 dark:bg-surface-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 font-mono">
            Competitive Benchmarking
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Why LibFlow OS Outclasses Legacy Systems
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-600 dark:text-surface-400">
            Compare our feature set side-by-side against standard library systems.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-800 bg-surface-50/80 dark:bg-surface-950/80 text-xs font-mono uppercase text-surface-500">
                <th className="py-5 px-6 font-bold">Capabilities & Automation</th>
                <th className="py-5 px-6 bg-brand-50/60 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-extrabold text-sm">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-500" /> LibFlow OS
                  </div>
                </th>
                <th className="py-5 px-6 font-semibold">Koha Open Source</th>
                <th className="py-5 px-6 font-semibold">Destiny Library</th>
                <th className="py-5 px-6 font-semibold">Excel / Spreadsheets</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800 text-sm">
              {comparisonData.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-surface-50/60 dark:hover:bg-surface-800/40 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-surface-900 dark:text-surface-100">
                    {row.feature}
                  </td>

                  {/* LibFlow OS Cell */}
                  <td className="py-4 px-6 bg-brand-50/30 dark:bg-brand-950/30 font-bold text-emerald-600 dark:text-emerald-400">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                        <Check className="w-4 h-4" />
                      </div>
                      <span>Native Built-in</span>
                    </div>
                  </td>

                  {/* Koha Cell */}
                  <td className="py-4 px-6 text-surface-600 dark:text-surface-400 text-xs">
                    {typeof row.koha === 'boolean' ? (
                      row.koha ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-rose-400" />
                    ) : (
                      row.koha
                    )}
                  </td>

                  {/* Destiny Cell */}
                  <td className="py-4 px-6 text-surface-600 dark:text-surface-400 text-xs">
                    {typeof row.destiny === 'boolean' ? (
                      row.destiny ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-rose-400" />
                    ) : (
                      row.destiny
                    )}
                  </td>

                  {/* Manual / Excel */}
                  <td className="py-4 px-6 text-surface-400 text-xs">
                    <X className="w-4 h-4 text-rose-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}