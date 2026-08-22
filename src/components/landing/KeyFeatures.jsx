import React from 'react';
import {
  ScanLine,
  Sparkles,
  BellRing,
  CreditCard,
  Layers,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Database,
  Cpu,
  RefreshCw,
  QrCode
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function KeyFeatures() {
  const features = [
    {
      icon: ScanLine,
      title: 'Smart RFID & Laser Barcode Core',
      tag: 'Hardware Agnostic',
      description: 'Supports high-speed laser scanners, RFID multi-tag readers, and camera-based mobile checkouts. Up to 5 items checked out in a single pass.',
      gradient: 'from-brand-500/20 to-indigo-500/5',
      badgeColor: 'primary'
    },
    {
      icon: Sparkles,
      title: 'AI Semantic Research Discovery',
      tag: 'Vector AI Powered',
      description: 'Students search using natural language (e.g. "books on distributed consensus algorithms") to find relevant textbooks even without knowing exact titles.',
      gradient: 'from-accent-500/20 to-emerald-500/5',
      badgeColor: 'success'
    },
    {
      icon: BellRing,
      title: 'Autonomous Overdue Recovery',
      tag: '84% Less Delinquency',
      description: 'Intelligent multi-channel nudges via WhatsApp and Email with automated fine calculations ($0.75/day) and frictionless 1-click digital payment settlement.',
      gradient: 'from-amber-500/20 to-orange-500/5',
      badgeColor: 'warning'
    },
    {
      icon: QrCode,
      title: 'Digital Patron IDs & QR Wallets',
      tag: 'Apple & Google Wallet Ready',
      description: 'Generate real-time cryptographic digital library passes with member tier limits, active loan quotas, and instantaneous contactless scan gates.',
      gradient: 'from-purple-500/20 to-pink-500/5',
      badgeColor: 'purple'
    },
    {
      icon: Layers,
      title: 'Dewey Decimal & Shelf Heatmaps',
      tag: 'Space Utilization',
      description: 'Visualize book locations across zones, racks, and shelves. Dynamic shelf capacity indicators warn staff before book overflow occurs.',
      gradient: 'from-sky-500/20 to-blue-500/5',
      badgeColor: 'info'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Multi-Role Security',
      tag: 'RBAC Cloud Ready',
      description: 'Granular permissions for Head Librarians, Student Patrons, Faculty Researchers, and Inventory Auditors with complete tamper-proof audit trails.',
      gradient: 'from-rose-500/20 to-red-500/5',
      badgeColor: 'danger'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-surface-100/40 dark:bg-surface-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 font-mono">
            Platform Capabilities
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Built for High-Throughput Academic & Public Libraries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-600 dark:text-surface-400">
            Every feature is engineered for extreme speed, intuitive usability, and zero downtime.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900/90 p-7 shadow-sm transition-all duration-300 hover:shadow-card-hover hover:border-brand-500/50 dark:hover:border-brand-500/40 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={feat.badgeColor} size="sm">
                      {feat.tag}
                    </Badge>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-surface-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-100 dark:border-surface-800/80 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
                  <span>Explore Feature</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>

                {/* Subtle Hover Gradient Glow */}
                <div
                  className={`pointer-events-none absolute -right-12 -bottom-12 w-36 h-36 rounded-full bg-gradient-to-br ${feat.gradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}