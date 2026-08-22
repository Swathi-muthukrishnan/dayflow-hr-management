// src/pages/employee/EmployeeDocuments.jsx
import React, { useState } from 'react';
import { FileText, Download, UploadCloud, CheckCircle2, ShieldCheck, Eye } from 'lucide-react';
import { useHrms } from '../../context/HrmsContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export function EmployeeDocuments() {
  const { currentUser } = useAuth();
  const { showToast, generatePayslipPdfAction } = useHrms();
  const [isUploading, setIsUploading] = useState(false);

  const documents = [
    {
      id: 'DOC-01',
      name: 'Official Employment Offer Letter',
      type: 'Contract',
      issuedDate: 'March 10, 2023',
      size: '1.4 MB',
      status: 'Signed & Active'
    },
    {
      id: 'DOC-02',
      name: 'Non-Disclosure & IP Assignment Agreement',
      type: 'Legal',
      issuedDate: 'March 15, 2023',
      size: '890 KB',
      status: 'Verified'
    },
    {
      id: 'DOC-03',
      name: 'State & Federal Tax Withholding (Form W-4)',
      type: 'Tax & Compliance',
      issuedDate: 'Jan 05, 2026',
      size: '420 KB',
      status: 'Filed'
    },
    {
      id: 'DOC-04',
      name: 'Dayflow August 2026 Salary Statement',
      type: 'Payroll',
      issuedDate: 'August 31, 2026',
      size: '240 KB',
      status: 'Available',
      isPayslip: true
    }
  ];

  const handleUploadSim = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      showToast('Document uploaded and queued for HR verification!', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="pb-2 border-b border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-900 dark:text-white tracking-tight">
            Employee Documents Repository
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
            Access employment agreements, tax compliance certifications, and signed contracts.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          icon={UploadCloud}
          isLoading={isUploading}
          onClick={handleUploadSim}
          className="text-xs font-bold"
        >
          Upload New Document
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-surface-900 dark:text-white">
                    {doc.name}
                  </h4>
                  <span className="text-[10px] text-surface-400 font-mono">
                    {doc.type} • {doc.size}
                  </span>
                </div>
              </div>
              <Badge variant="success" size="xs">
                {doc.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-800 text-xs">
              <span className="text-surface-400 font-mono text-[11px]">
                Issued: {doc.issuedDate}
              </span>

              <button
                onClick={() => {
                  if (doc.isPayslip) {
                    generatePayslipPdfAction(currentUser, 'August 2026');
                  } else {
                    showToast(`Downloading verified copy of ${doc.name}...`, 'info');
                  }
                }}
                className="flex items-center gap-1 text-brand-600 dark:text-brand-400 font-bold hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}