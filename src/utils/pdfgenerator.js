// src/utils/pdfGenerator.js
import { jsPDF } from 'jspdf';
import { formatCurrency } from './payrollUtils';

/**
 * Generates a professional Dayflow PDF payslip.
 */
export function generatePayslipPdf({
  employeeName = 'Alex Rivera',
  employeeId = 'DF-1001',
  department = 'Engineering',
  designation = 'Senior Frontend Engineer',
  payPeriod = 'August 2026',
  payDate = 'August 31, 2026',
  basic = 7500,
  allowances = 1800,
  deductions = 950,
  netSalary = 8350,
  bankAccount = '•••• •••• •••• 4912',
  taxId = 'TX-8921-948'
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Theme Colors
  const primaryColor = [79, 70, 229]; // Indigo #4f46e5
  const slateDark = [15, 23, 42];     // Slate 900
  const slateLight = [248, 250, 252]; // Slate 50
  const slateMuted = [100, 116, 139]; // Slate 500
  const emeraldColor = [16, 185, 129];// Emerald #10b981
  const borderSlate = [226, 232, 240];// Slate 200

  // 1. Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('DAYFLOW', 16, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Human Resource Management System — Every workday, perfectly aligned.', 16, 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SALARY PAYSLIP', 194, 16, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Period: ${payPeriod}`, 194, 23, { align: 'right' });

  // 2. Company Info Bar
  doc.setTextColor(...slateDark);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Dayflow Technologies Inc. • 100 Innovation Way, Suite 400 • San Francisco, CA 94105 • support@dayflow.io', 16, 38);

  doc.setDrawColor(...borderSlate);
  doc.setLineWidth(0.5);
  doc.line(16, 42, 194, 42);

  // 3. Employee Metadata Box
  doc.setFillColor(...slateLight);
  doc.roundedRect(16, 46, 178, 38, 3, 3, 'F');
  doc.roundedRect(16, 46, 178, 38, 3, 3, 'S');

  // Left Column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Employee Name:', 22, 54);
  doc.setFont('helvetica', 'normal');
  doc.text(employeeName, 58, 54);

  doc.setFont('helvetica', 'bold');
  doc.text('Employee ID:', 22, 62);
  doc.setFont('helvetica', 'normal');
  doc.text(employeeId, 58, 62);

  doc.setFont('helvetica', 'bold');
  doc.text('Department:', 22, 70);
  doc.setFont('helvetica', 'normal');
  doc.text(department, 58, 70);

  doc.setFont('helvetica', 'bold');
  doc.text('Designation:', 22, 78);
  doc.setFont('helvetica', 'normal');
  doc.text(designation, 58, 78);

  // Right Column
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Date:', 115, 54);
  doc.setFont('helvetica', 'normal');
  doc.text(payDate, 150, 54);

  doc.setFont('helvetica', 'bold');
  doc.text('Bank Account:', 115, 62);
  doc.setFont('helvetica', 'normal');
  doc.text(bankAccount, 150, 62);

  doc.setFont('helvetica', 'bold');
  doc.text('Tax / SSN ID:', 115, 70);
  doc.setFont('helvetica', 'normal');
  doc.text(taxId, 150, 70);

  doc.setFont('helvetica', 'bold');
  doc.text('Payment Status:', 115, 78);
  doc.setTextColor(...emeraldColor);
  doc.text('PROCESSED / PAID', 150, 78);

  // 4. Earnings & Deductions Tables (Two Columns)
  const tableTop = 92;
  const colWidth = 86;

  // Earnings Table Header
  doc.setFillColor(...slateDark);
  doc.rect(16, tableTop, colWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('EARNINGS', 20, tableTop + 5.5);
  doc.text('AMOUNT', 98, tableTop + 5.5, { align: 'right' });

  // Earnings Items
  const earnings = [
    { label: 'Basic Salary', amount: basic * 0.7 },
    { label: 'House Rent Allowance (HRA)', amount: basic * 0.2 },
    { label: 'Special / City Allowance', amount: basic * 0.1 },
    { label: 'Performance Bonus', amount: allowances * 0.6 },
    { label: 'Internet & Wellness Stipend', amount: allowances * 0.4 },
  ];

  let currentY = tableTop + 14;
  doc.setTextColor(...slateDark);
  doc.setFontSize(8.5);

  earnings.forEach((item, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(16, currentY - 4, colWidth, 6.5, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.text(item.label, 20, currentY);
    doc.setFont('helvetica', 'bold');
    doc.text(formatCurrency(item.amount), 98, currentY, { align: 'right' });
    currentY += 7;
  });

  const grossEarnings = basic + allowances;

  // Deductions Table Header
  doc.setFillColor(...slateDark);
  doc.rect(108, tableTop, colWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('DEDUCTIONS', 112, tableTop + 5.5);
  doc.text('AMOUNT', 190, tableTop + 5.5, { align: 'right' });

  // Deductions Items
  const deductionItems = [
    { label: 'Provident Fund / 401(k)', amount: deductions * 0.4 },
    { label: 'Income Tax (TDS / Federal)', amount: deductions * 0.45 },
    { label: 'Health & Dental Insurance', amount: deductions * 0.15 },
    { label: 'Professional Tax', amount: 0 },
    { label: 'Other Deductions', amount: 0 },
  ];

  let deductionY = tableTop + 14;
  doc.setTextColor(...slateDark);
  doc.setFontSize(8.5);

  deductionItems.forEach((item, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(108, deductionY - 4, colWidth, 6.5, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.text(item.label, 112, deductionY);
    doc.setFont('helvetica', 'bold');
    doc.text(formatCurrency(item.amount), 190, deductionY, { align: 'right' });
    deductionY += 7;
  });

  // Table Totals Bar
  const totalBarY = Math.max(currentY, deductionY) + 2;
  doc.setFillColor(...slateLight);
  doc.rect(16, totalBarY, colWidth, 8, 'F');
  doc.rect(108, totalBarY, colWidth, 8, 'F');
  doc.setDrawColor(...borderSlate);
  doc.rect(16, totalBarY, colWidth, 8, 'S');
  doc.rect(108, totalBarY, colWidth, 8, 'S');

  doc.setTextColor(...slateDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Total Gross Earnings:', 20, totalBarY + 5.5);
  doc.text(formatCurrency(grossEarnings), 98, totalBarY + 5.5, { align: 'right' });

  doc.text('Total Deductions:', 112, totalBarY + 5.5);
  doc.setTextColor(225, 29, 72);
  doc.text(`-${formatCurrency(deductions)}`, 190, totalBarY + 5.5, { align: 'right' });

  // 5. Net Salary Highlighted Box
  const netBoxY = totalBarY + 16;
  doc.setFillColor(238, 242, 255); // Indigo 50
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.roundedRect(16, netBoxY, 178, 28, 4, 4, 'FD');

  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('NET SALARY PAYABLE', 24, netBoxY + 10);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slateMuted);
  doc.text('Amount Credited Directly into Employee Bank Account', 24, netBoxY + 18);

  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(formatCurrency(netSalary), 186, netBoxY + 16, { align: 'right' });

  // 6. Signatures & Verification Note
  const signY = netBoxY + 38;
  doc.setDrawColor(...borderSlate);
  doc.setLineWidth(0.5);
  doc.line(16, signY, 70, signY);
  doc.line(140, signY, 194, signY);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slateMuted);
  doc.text('Employee Signature', 16, signY + 5);
  doc.text('Authorized Dayflow HR Signatory', 140, signY + 5);

  // 7. Footer
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Confidential Document — Generated digitally by DAYFLOW HRMS Cloud Platform. No physical signature required.', 105, 285, { align: 'center' });

  // Save the document
  const fileName = `Dayflow_Payslip_${employeeId}_${payPeriod.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
  return fileName;
}