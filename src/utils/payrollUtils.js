// src/utils/payrollUtils.js

/**
 * Currency formatter for USD
 */
export function formatCurrency(amount = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Computes net salary and breakdown given basic and custom allowances/deductions
 */
export function calculateSalaryBreakdown(basic = 6500, allowances = 1200, deductions = 750) {
  const gross = basic + allowances;
  const net = Math.max(0, gross - deductions);
  return {
    basic,
    allowances,
    deductions,
    gross,
    net,
  };
}

/**
 * Generate monthly payslip reference number
 */
export function generatePayslipRef(employeeId = 'DF-1001', month = 'August', year = '2026') {
  return `PAY-${year.slice(-2)}${month.slice(0, 3).toUpperCase()}-${employeeId}`;
}