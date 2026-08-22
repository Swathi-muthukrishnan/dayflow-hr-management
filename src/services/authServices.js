// src/services/authService.js
import { initialEmployees } from './mockHrmsData';

const AUTH_STORAGE_KEY = 'dayflow_auth_user';
const USERS_STORAGE_KEY = 'dayflow_registered_users';

export const authService = {
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading auth user', e);
    }
    // Default demo user: Alex Rivera (Employee)
    return initialEmployees[0];
  },

  setCurrentUser(user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  },

  getAllRegisteredUsers() {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading registered users', e);
    }
    return initialEmployees;
  },

  async login(email, password) {
    await new Promise(resolve => setTimeout(resolve, 600)); // Smooth UX transition
    const all = this.getAllRegisteredUsers();
    const user = all.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // If user not found, default to Alex Rivera for convenient demoing
      const defaultUser = email.toLowerCase().includes('admin') ? initialEmployees[1] : initialEmployees[0];
      this.setCurrentUser(defaultUser);
      return defaultUser;
    }

    this.setCurrentUser(user);
    return user;
  },

  async signup(userData) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const all = this.getAllRegisteredUsers();
    
    const newUser = {
      id: userData.employeeId || `DF-${1000 + all.length + 1}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'Employee',
      designation: userData.designation || (userData.role === 'HR/Admin' ? 'HR Specialist' : 'Software Engineer'),
      department: userData.department || (userData.role === 'HR/Admin' ? 'People Ops' : 'Engineering'),
      joiningDate: new Date().toISOString().split('T')[0],
      phone: '+1 (555) 000-1122',
      address: 'San Francisco, CA',
      manager: 'Sarah Chen',
      avatar: userData.avatar || `https://images.unsplash.com/photo-${1534528741775 + all.length}?w=150&auto=format&fit=crop&q=80`,
      employmentStatus: 'Full-time',
      location: 'San Francisco, CA (Hybrid)',
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
      }
    };

    all.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(all));
    this.setCurrentUser(newUser);
    return newUser;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  // Helper to switch instantly for hackathon demo
  switchDemoRole(targetRole = 'Employee') {
    let user;
    if (targetRole === 'HR/Admin' || targetRole === 'admin') {
      user = initialEmployees[1]; // Sarah Chen (HR/Admin)
    } else {
      user = initialEmployees[0]; // Alex Rivera (Employee)
    }
    this.setCurrentUser(user);
    return user;
  }
};