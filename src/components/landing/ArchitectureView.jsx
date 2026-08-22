import React, { useState } from 'react';
import { Layers, Server, Database, Sparkles, Cpu, Globe, ArrowRight, ShieldCheck, Code, Check } from 'lucide-react';
import { Badge } from '../common/Badge';

export function ArchitectureView() {
  const [selectedNode, setSelectedNode] = useState('frontend');

  const nodes = {
    frontend: {
      title: 'Modern Single-Page Client (React 18 + Vite)',
      tech: 'React 18, Vite, Tailwind CSS, Lucide React',
      role: 'Zero-latency responsive client with rich telemetry, optimistic updates, and offline fallback caching.',
      endpoints: ['POST /api/v1/circulation/checkout', 'GET /api/v1/catalog/books', 'POST /api/v1/fines/settle']
    },
    service: {
      title: 'Decoupled API & Service Gateway',
      tech: 'REST / GraphQL / WebSocket Event Bus',
      role: 'Modular abstraction layer allowing hot-swapping between Local Simulation Mode and Live Backend Microservices.',
      endpoints: ['JWT Auth Middleware', 'Rate Limiter (100 req/s)', 'Telemetry Event Stream']
    },
    engine: {
      title: 'Autonomous Intelligence & Circulation Core',
      tech: 'FastAPI / Node.js Engine + OpenLibrary + AI Vector Search',
      role: 'Sub-second RFID multi-item batch parser, vector-similarity textbook recommendation, and cron overdue alert daemon.',
      endpoints: ['Vector Embedding Matcher', 'WhatsApp Twilio Webhook', 'Automated Overdue CRON']
    },
    storage: {
      title: 'Cloud Persistence & Audit Ledger',
      tech: 'PostgreSQL / SQLite + Redis Cache',
      role: 'ACID-compliant circulation transaction ledger, member quotas, and Dewey Decimal catalog index.',
      endpoints: ['Multi-tenant DB Schemas', 'Audit Trail Tables', 'Real-time Redis Pub/Sub']
    }
  };

  return (
    <section id="architecture" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 font-mono">
            System Design & Pipeline
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Production-Ready Architecture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-600 dark:text-surface-400">
            Engineered with a clean separation of concerns for seamless hackathon grading and production deployment.
          </p>
        </div>

        {/* Architecture Pipeline Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { id: 'frontend', label: '1. Frontend Client', icon: Globe, color: 'brand' },
            { id: 'service', label: '2. Service Gateway', icon: Server, color: 'indigo' },
            { id: 'engine', label: '3. Autonomous Engine', icon: Cpu, color: 'accent' },
            { id: 'storage', label: '4. Persistence Ledger', icon: Database, color: 'amber' }
          ].map((step) => {
            const Icon = step.icon;
            const isSelected = selectedNode === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setSelectedNode(step.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 shadow-glow-sm ring-2 ring-brand-500/20'
                    : 'border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 hover:border-surface-300 dark:hover:border-surface-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-brand-600 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                  )}
                </div>
                <h4 className="mt-3 text-sm font-bold text-surface-900 dark:text-white">
                  {step.label}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-surface-100 dark:border-surface-800">
            <div>
              <span className="text-xs font-mono font-semibold text-brand-600 dark:text-brand-400 uppercase">
                Selected Component Layer
              </span>
              <h3 className="text-xl font-bold text-surface-900 dark:text-white mt-1">
                {nodes[selectedNode].title}
              </h3>
            </div>
            <Badge variant="primary" size="md">
              {nodes[selectedNode].tech}
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold text-surface-900 dark:text-white">
                Core Responsibility:
              </h4>
              <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                {nodes[selectedNode].role}
              </p>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check className="w-4 h-4" /> Ready for Live API Integration via Settings Tab
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-950 text-white rounded-2xl p-5 font-mono text-xs shadow-inner">
              <div className="text-surface-400 pb-2 border-b border-surface-800 text-[11px]">
                API ROUTE SPECIFICATION
              </div>
              <div className="mt-3 space-y-2 text-emerald-400">
                {nodes[selectedNode].endpoints.map((ep, i) => (
                  <div key={i} className="p-1.5 rounded bg-surface-900/90 border border-surface-800">
                    &gt; {ep}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}