import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Bot,
  Send,
  BellRing,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function AiAssistantTab() {
  const { books, loans, dispatchOverdueAlerts, showToast, setActiveTab } = useLibrary();

  // AI Semantic Finder state
  const [aiQuery, setAiQuery] = useState('');
  const [isSearchingAi, setIsSearchingAi] = useState(false);
  const [aiResults, setAiResults] = useState(null);

  // Overdue Dispatch state
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchedHistory, setDispatchedHistory] = useState(null);

  // Sample prompt chips
  const samplePrompts = [
    'Textbooks for distributed consensus and high-throughput databases',
    'Beginner-friendly machine learning and neural networks with Python',
    'Zero to monopoly startup strategy and venture capital',
    'Brain anatomy, synaptic transmission, and neuroscience fundamentals'
  ];

  const handleRunAiSearch = async (queryToRun) => {
    const q = queryToRun || aiQuery;
    if (!q) {
      showToast('Please enter a research prompt or question', 'warning');
      return;
    }

    setIsSearchingAi(true);
    try {
      // Simulate vector semantic embedding inference
      await new Promise(r => setTimeout(r, 650));

      const lower = q.toLowerCase();
      const scored = books.map((b) => {
        let score = 65;
        if (lower.includes('database') || lower.includes('distributed') || lower.includes('system')) {
          if (b.id === 'BK-1001' || b.id === 'BK-1004') score = 98;
        } else if (lower.includes('neural') || lower.includes('machine learning') || lower.includes('python') || lower.includes('ai')) {
          if (b.id === 'BK-1006' || b.id === 'BK-1003') score = 96;
        } else if (lower.includes('startup') || lower.includes('monopoly') || lower.includes('business')) {
          if (b.id === 'BK-1005') score = 97;
        } else if (lower.includes('brain') || lower.includes('neuroscience') || lower.includes('medicine')) {
          if (b.id === 'BK-1007') score = 99;
        } else {
          score = Math.floor(75 + Math.random() * 20);
        }
        return { ...b, matchScore: score };
      });

      scored.sort((a, b) => b.matchScore - a.matchScore);
      setAiResults(scored.slice(0, 3));
      showToast('AI vector similarity search completed!', 'success');
    } finally {
      setIsSearchingAi(false);
    }
  };

  const handleDispatchOverdue = async () => {
    setIsDispatching(true);
    try {
      await new Promise(r => setTimeout(r, 600));
      await dispatchOverdueAlerts();
      setDispatchedHistory({
        timestamp: new Date().toLocaleTimeString(),
        alertsSent: 2,
        channels: ['WhatsApp Cloud API', 'Student SMTP Relay'],
        costPerMsg: '$0.00 (Institutional Zero-Tier)'
      });
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-surface-900 dark:text-white tracking-tight">
          AI Intelligence & Automation Center
        </h2>
        <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
          Semantic natural language catalog discovery & autonomous multi-channel overdue recovery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: AI Semantic Discovery Engine */}
        <div className="lg:col-span-7 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 sm:p-8 shadow-md">
          <div className="flex items-center gap-3 pb-6 border-b border-surface-100 dark:border-surface-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-surface-900 dark:text-white">
                Semantic Research & Textbook Matcher
              </h3>
              <p className="text-xs text-surface-500">
                Vector similarity search understands topic intent without exact keyword matches.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunAiSearch()}
                  placeholder="Ask in natural language (e.g. 'I want books on distributed consensus')..."
                  className="flex-1 px-4 py-3 bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
                />
                <Button
                  variant="gradient"
                  isLoading={isSearchingAi}
                  onClick={() => handleRunAiSearch()}
                  className="font-bold px-6"
                >
                  <Sparkles className="w-4 h-4 mr-1.5" /> AI Search
                </Button>
              </div>
            </div>

            {/* Prompt presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider">
                Recommended Prompt Queries:
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAiQuery(prompt);
                      handleRunAiSearch(prompt);
                    }}
                    className="text-left text-xs p-2 rounded-xl bg-surface-50 dark:bg-surface-950 hover:bg-brand-50 dark:hover:bg-brand-950 border border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-300 transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* AI Results */}
            {aiResults && (
              <div className="mt-6 space-y-4 pt-4 border-t border-surface-100 dark:border-surface-800">
                <span className="text-xs font-bold font-mono text-brand-600 dark:text-brand-400">
                  TOP VECTOR SIMILARITY MATCHES:
                </span>

                <div className="space-y-3">
                  {aiResults.map((book) => (
                    <div
                      key={book.id}
                      className="p-4 rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-50/60 dark:bg-surface-950 flex flex-col sm:flex-row items-start justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-lg shadow-sm shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              {book.matchScore}% Match
                            </span>
                            <Badge size="sm">{book.category}</Badge>
                          </div>
                          <h4 className="font-bold text-sm text-surface-900 dark:text-white mt-1">
                            {book.title}
                          </h4>
                          <p className="text-xs text-surface-500">
                            By {book.author} • Shelf: {book.shelfLocation} ({book.availableCopies} available)
                          </p>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setActiveTab('circulation')}
                        className="shrink-0 text-xs"
                      >
                        Issue / Borrow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 cols: Automated Overdue Recovery Engine */}
        <div className="lg:col-span-5 rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-surface-100 dark:border-surface-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                  Automated Overdue Nudge Daemon
                </h3>
              </div>
              <Badge variant="warning" size="sm">Active CRON</Badge>
            </div>

            {/* Live Sample WhatsApp Message Template Preview */}
            <div className="mt-4 p-4 rounded-2xl bg-surface-950 text-white font-sans text-xs shadow-inner space-y-2 border border-surface-800">
              <div className="flex items-center justify-between pb-2 border-b border-surface-800 text-[10px] text-emerald-400 font-mono">
                <span>WHATSAPP CLOUD API TEMPLATE</span>
                <span>VERIFIED</span>
              </div>
              <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-800/80 text-emerald-200 leading-relaxed text-xs">
                "Hello <span className="font-bold text-white">Devon Patel</span>! 📚 Your loan of <span className="font-bold text-white">Introduction to Algorithms</span> is 6 days overdue. Accumulated fee is <span className="font-bold text-amber-300">$4.50</span>. Tap here to renew or pay digitally: <span className="underline text-sky-300">libflow.io/pay/LN-501</span>"
              </div>
            </div>

            <div className="mt-5 space-y-2 text-xs text-surface-600 dark:text-surface-400">
              <div className="flex items-center justify-between">
                <span>Target Overdue Loans:</span>
                <span className="font-bold font-mono text-rose-600">2 Patrons</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Fine Rate Policy:</span>
                <span className="font-bold font-mono text-surface-900 dark:text-white">$0.75 / day</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-surface-100 dark:border-surface-800 space-y-3">
            <Button
              variant="gradient"
              size="md"
              icon={Send}
              isLoading={isDispatching}
              onClick={handleDispatchOverdue}
              className="w-full font-bold shadow-glow-sm"
            >
              🚀 Fire Batch Overdue Dispatches
            </Button>

            {dispatchedHistory && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-mono animate-scaleUp">
                ✓ Batch dispatched at {dispatchedHistory.timestamp} to {dispatchedHistory.alertsSent} patrons via WhatsApp & Email.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}