// src/services/employeeService.js
import { initialEmployees } from './mockHrmsData';

const EMPLOYEES_STORAGE_KEY = 'dayflow_all_employees';

export const employeeService = {
  getAllEmployees() {
    try {
      const stored = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading employees', e);
    }
    return initialEmployees;
  },

  saveEmployees(employees) {
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
  },

  getEmployeeById(id) {
    const all = this.getAllEmployees();
    return all.find(e => e.id === id) || all[0];
  },

  updateEmployee(id, updatedFields) {
    const all = this.getAllEmployees();
    const index = all.findIndex(e => e.id === id);
    if (index >= 0) {
      all[index] = { ...all[index], ...updatedFields };
      this.saveEmployees(all);
      return all[index];
    }
    return null;
  },

  addEmployee(employeeData) {
    const all = this.getAllEmployees();
    const newEmp = {
      id: `DF-${1000 + all.length + 1}`,
      attendanceRate: 100,
      leavesTaken: 0,
      leaveBalance: {
        paid: 15,
        sick: 8,
        unpaid: 'Unlimited',
        casual: 5
      },
      salary: {
        basic: 7000,
        allowances: 1500,
        deductions: 800,
        netSalary: 7700,
        bankAccount: '•••• •••• •••• 9999',
        taxId: 'TX-9999-001'
      },
      ...employeeData
    };
    all.push(newEmp);
    this.saveEmployees(all);
    return newEmp;
  }
};