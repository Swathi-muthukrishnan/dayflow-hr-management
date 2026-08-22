import React, { useState } from 'react';
import { Scan, BookCheck, LineChart, BellRing, Sparkles, ArrowRight, Layers, Smartphone } from 'lucide-react';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Zero-Touch Catalog Ingestion',
      subtitle: 'Scan ISBN & Auto-Fetch in 50ms',
      description: 'Librarians can scan any 10/13 digit ISBN barcode. LibFlow instantly queries OpenLibrary and global repositories, pulling high-res cover art, Dewey Decimal class, publisher, and synopsis automatically.',
      icon: Scan,
      badge: 'Auto-Indexing',
      preview: {
        label: 'Auto-Resolved Metadata',
        item1: 'ISBN: 978-0132350884',
        item2: 'Title: Clean Code (Robert C. Martin)',
        item3: 'Classification: Dewey 005.1 (CS)',
        item4: 'Status: 10 Copies Synced to Cloud'
      }
    },
    {
      number: '02',
      title: 'Smart RFID Batch Circulation',
      subtitle: 'Sub-second multi-item checkout',
      description: 'Patrons scan their digital mobile pass and place their stack of books onto the RFID scanner pad. The system checks out up to 5 items simultaneously in under 1 second without scanning one-by-one.',
      icon: Smartphone,
      badge: '< 1.2s Fast Lane',
      preview: {
        label: 'Live Checkout Session',
        item1: 'Patron: Maya Lin (CS-2024-089)',
        item2: 'Books Scanned: 2 items concurrently',
        item3: 'RFID Tags: Verified & De-alarmed',
        item4: 'Digital Receipt: Dispatched to Email'
      }
    },
    {
      number: '03',
      title: 'Autonomous Overdue Engine',
      subtitle: 'Zero-effort multi-channel nudges',
      description: 'Never chase late books manually again. LibFlow continuously tracks loan countdowns and automatically triggers friendly WhatsApp, SMS, and email alerts with dynamic fine payment links.',
      icon: BellRing,
      badge: '84% Recovery Rate',
      preview: {
        label: 'Dispatch Queue Trigger',
        item1: 'Trigger: 48h Pre-Due Notice',
        item2: 'Channel: WhatsApp & Email Gateway',
        item3: 'Fine Policy: $0.75/day auto-calculated',
        item4: 'Action: 1-Click Online Renewal Link'
      }
    },
    {
      number: '04',
      title: 'Predictive Demand & Space AI',
      subtitle: 'Vector-similarity textbook recommendations',
      description: 'Our AI analyzes course syllabi, borrowing velocity, and upcoming midterm exam periods to forecast which books will run out of stock 3 weeks in advance.',
      icon: LineChart,
      badge: 'Predictive AI',
      preview: {
        label: 'AI Demand Forecast',
        item1: 'Topic: Distributed Systems (CS 401)',
        item2: 'Predicted Surge: +340% next week',
        item3: 'Action: Reserved 4 extra reference copies',
        item4: 'Shelf Heatmap: High density Zone B'
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 font-mono">
            Workflow Architecture
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            How LibFlow OS Powers Next-Gen Circulation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-600 dark:text-surface-400">
            Four seamless steps from physical barcode scan to real-time analytics.
          </p>
        </div>

        {/* Step Tabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-6 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 shadow-glow-sm ring-2 ring-brand-500/20'
                    : 'border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 hover:border-surface-300 dark:hover:border-surface-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-2xl font-black ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-surface-400'}`}>
                    {step.number}
                  </span>
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-brand-600 text-white shadow-sm' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-base text-surface-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                  {step.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card Showcase */}
        <div className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-xs font-bold font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                {steps[activeStep].badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white">
                Step {steps[activeStep].number}: {steps[activeStep].title}
              </h3>

              <p className="mt-4 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
                {steps[activeStep].description}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                >
                  Next step in pipeline <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Terminal / Telemetry Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-950 text-surface-100 p-6 font-mono shadow-xl relative">
                <div className="flex items-center justify-between pb-3 border-b border-surface-800 text-xs text-surface-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {steps[activeStep].preview.label}
                  </span>
                  <span className="text-[10px] text-surface-500">LIVE FEED</span>
                </div>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="p-2 rounded bg-surface-900/90 border border-surface-800 text-emerald-400">
                    &gt; {steps[activeStep].preview.item1}
                  </div>
                  <div className="p-2 rounded bg-surface-900/90 border border-surface-800 text-surface-300">
                    &gt; {steps[activeStep].preview.item2}
                  </div>
                  <div className="p-2 rounded bg-surface-900/90 border border-surface-800 text-brand-400">
                    &gt; {steps[activeStep].preview.item3}
                  </div>
                  <div className="p-2 rounded bg-surface-900/90 border border-surface-800 text-accent-400">
                    &gt; {steps[activeStep].preview.item4}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}