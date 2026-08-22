// src/services/payrollService.js
import { samplePayslipHistory } from './mockHrmsData';

const PAYROLL_STORAGE_KEY = 'dayflow_payroll_history';

export const payrollService = {
  getPayslipHistory(employeeId = 'DF-1001') {
    try {
      const stored = localStorage.getItem(`${PAYROLL_STORAGE_KEY}_${employeeId}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading payroll history', e);
    }
    return samplePayslipHistory;
  },

  savePayslip(employeeId = 'DF-1001', payslip) {
    const history = this.getPayslipHistory(employeeId);
    const updated = [payslip, ...history.filter(p => p.id !== payslip.id)];
    localStorage.setItem(`${PAYROLL_STORAGE_KEY}_${employeeId}`, JSON.stringify(updated));
    return updated;
  }
};