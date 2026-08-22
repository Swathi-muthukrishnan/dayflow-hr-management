// src/services/mockHrmsData.js

export const initialEmployees = [
  {
    id: 'DF-1001',
    name: 'Alex Rivera',
    email: 'alex.rivera@dayflow.io',
    role: 'Employee',
    designation: 'Senior Frontend Engineer',
    department: 'Engineering',
    joiningDate: '2023-03-15',
    phone: '+1 (555) 234-5678',
    address: '452 Mission Street, Suite 800, San Francisco, CA',
    manager: 'Sarah Chen (VP of Engineering)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    employmentStatus: 'Full-time',
    location: 'San Francisco, CA (Hybrid)',
    attendanceRate: 94,
    leavesTaken: 6,
    leaveBalance: {
      paid: 12,
      sick: 7,
      unpaid: 'Unlimited',
      casual: 5
    },
    salary: {
      basic: 7500,
      allowances: 1800,
      deductions: 950,
      netSalary: 8350,
      bankAccount: '•••• •••• •••• 4912',
      taxId: 'TX-8921-948'
    }
  },
  {
    id: 'DF-1002',
    name: 'Sarah Chen',
    email: 'sarah.chen@dayflow.io',
    role: 'HR/Admin',
    designation: 'Head of People & Culture',
    department: 'People Ops',
    joiningDate: '2022-01-10',
    phone: '+1 (555) 876-5432',
    address: '789 Market St, San Francisco, CA',
    manager: 'Elena Rostova (Chief Executive Officer)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    employmentStatus: 'Full-time',
    location: 'San Francisco, CA (HQ)',
    attendanceRate: 98,
    leavesTaken: 3,
    leaveBalance: {
      paid: 15,
      sick: 8,
      unpaid: 'Unlimited',
      casual: 6
    },
    salary: {
      basic: 9500,
      allowances: 2500,
      deductions: 1300,
      netSalary: 10700,
      bankAccount: '•••• •••• •••• 1024',
      taxId: 'TX-4401-129'
    }
  },
  {
    id: 'DF-1003',
    name: 'Michael Scott',
    email: 'michael.scott@dayflow.io',
    role: 'Employee',
    designation: 'Regional Sales Lead',
    department: 'Sales',
    joiningDate: '2023-06-01',
    phone: '+1 (555) 443-2211',
    address: '172 Scranton Road, New York, NY',
    manager: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    employmentStatus: 'Full-time',
    location: 'New York, NY (Remote)',
    attendanceRate: 88,
    leavesTaken: 9,
    leaveBalance: {
      paid: 8,
      sick: 4,
      unpaid: 'Unlimited',
      casual: 3
    },
    salary: {
      basic: 6800,
      allowances: 2200,
      deductions: 850,
      netSalary: 8150,
      bankAccount: '•••• •••• •••• 7731',
      taxId: 'TX-7719-502'
    }
  },
  {
    id: 'DF-1004',
    name: 'Priya Sharma',
    email: 'priya.sharma@dayflow.io',
    role: 'Employee',
    designation: 'Principal UI/UX Designer',
    department: 'Design',
    joiningDate: '2022-09-20',
    phone: '+1 (555) 991-8822',
    address: '120 Post Street, San Francisco, CA',
    manager: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    employmentStatus: 'Full-time',
    location: 'San Francisco, CA (Hybrid)',
    attendanceRate: 96,
    leavesTaken: 4,
    leaveBalance: {
      paid: 14,
      sick: 6,
      unpaid: 'Unlimited',
      casual: 5
    },
    salary: {
      basic: 7200,
      allowances: 1600,
      deductions: 900,
      netSalary: 7900,
      bankAccount: '•••• •••• •••• 3349',
      taxId: 'TX-2993-810'
    }
  },
  {
    id: 'DF-1005',
    name: 'David Kim',
    email: 'david.kim@dayflow.io',
    role: 'Employee',
    designation: 'DevOps & Cloud Architect',
    department: 'Engineering',
    joiningDate: '2023-11-01',
    phone: '+1 (555) 334-1188',
    address: '500 Howard St, San Francisco, CA',
    manager: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    employmentStatus: 'Full-time',
    location: 'San Francisco, CA (HQ)',
    attendanceRate: 99,
    leavesTaken: 1,
    leaveBalance: {
      paid: 17,
      sick: 8,
      unpaid: 'Unlimited',
      casual: 6
    },
    salary: {
      basic: 8200,
      allowances: 2000,
      deductions: 1050,
      netSalary: 9150,
      bankAccount: '•••• •••• •••• 8842',
      taxId: 'TX-1102-993'
    }
  },
  {
    id: 'DF-1006',
    name: 'Elena Rostova',
    email: 'elena.rostova@dayflow.io',
    role: 'HR/Admin',
    designation: 'Chief Executive Officer',
    department: 'Executive',
    joiningDate: '2021-01-01',
    phone: '+1 (555) 100-2000',
    address: '1 Marina Blvd, San Francisco, CA',
    manager: 'Board of Directors',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    employmentStatus: 'Full-time',
    location: 'San Francisco, CA (HQ)',
    attendanceRate: 97,
    leavesTaken: 5,
    leaveBalance: {
      paid: 20,
      sick: 10,
      unpaid: 'Unlimited',
      casual: 8
    },
    salary: {
      basic: 14000,
      allowances: 4000,
      deductions: 2200,
      netSalary: 15800,
      bankAccount: '•••• •••• •••• 9901',
      taxId: 'TX-0001-100'
    }
  },
  {
    id: 'DF-1007',
    name: 'Marcus Vance',
    email: 'marcus.vance@dayflow.io',
    role: 'Employee',
    designation: 'Product Marketing Manager',
    department: 'Marketing',
    joiningDate: '2023-04-10',
    phone: '+1 (555) 665-7788',
    address: '890 Folsom St, San Francisco, CA',
    manager: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    employmentStatus: 'Full-time',
    location: 'San Francisco, CA (Hybrid)',
    attendanceRate: 91,
    leavesTaken: 7,
    leaveBalance: {
      paid: 11,
      sick: 5,
      unpaid: 'Unlimited',
      casual: 4
    },
    salary: {
      basic: 6900,
      allowances: 1500,
      deductions: 820,
      netSalary: 7580,
      bankAccount: '•••• •••• •••• 5519',
      taxId: 'TX-6629-411'
    }
  },
  {
    id: 'DF-1008',
    name: 'Sophia Patel',
    email: 'sophia.patel@dayflow.io',
    role: 'Employee',
    designation: 'Growth Product Manager',
    department: 'Product',
    joiningDate: '2023-08-15',
    phone: '+1 (555) 441-9922',
    address: '220 Pine St, San Francisco, CA',
    manager: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    employmentStatus: 'Full-time',
    location: 'San Francisco, CA (HQ)',
    attendanceRate: 95,
    leavesTaken: 4,
    leaveBalance: {
      paid: 13,
      sick: 7,
      unpaid: 'Unlimited',
      casual: 5
    },
    salary: {
      basic: 7400,
      allowances: 1900,
      deductions: 930,
      netSalary: 8370,
      bankAccount: '•••• •••• •••• 6610',
      taxId: 'TX-8830-109'
    }
  }
];

export const initialLeaveRequests = [
  {
    id: 'LR-2026-081',
    employeeId: 'DF-1001',
    employeeName: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Engineering',
    type: 'Paid Leave',
    from: '2026-08-25',
    to: '2026-08-27',
    days: 3,
    remarks: 'Family travel and personal commitment scheduled during non-sprint freeze window.',
    status: 'Pending',
    appliedDate: '2026-08-22',
    hrComment: null,
  },
  {
    id: 'LR-2026-079',
    employeeId: 'DF-1004',
    employeeName: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Design',
    type: 'Sick Leave',
    from: '2026-08-24',
    to: '2026-08-24',
    days: 1,
    remarks: 'Dental surgery and prescribed recovery rest.',
    status: 'Pending',
    appliedDate: '2026-08-21',
    hrComment: null,
  },
  {
    id: 'LR-2026-074',
    employeeId: 'DF-1003',
    employeeName: 'Michael Scott',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Sales',
    type: 'Casual Leave',
    from: '2026-08-18',
    to: '2026-08-19',
    days: 2,
    remarks: 'Attending regional sales summit and networking event.',
    status: 'Approved',
    appliedDate: '2026-08-14',
    hrComment: 'Approved. Please submit travel expense receipts upon return.',
  },
  {
    id: 'LR-2026-068',
    employeeId: 'DF-1007',
    employeeName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    department: 'Marketing',
    type: 'Paid Leave',
    from: '2026-08-11',
    to: '2026-08-12',
    days: 2,
    remarks: 'Personal time off for house relocation.',
    status: 'Rejected',
    appliedDate: '2026-08-08',
    hrComment: 'Rejected due to critical product launch campaign sprint deliverables. Please reschedule after launch.',
  },
  {
    id: 'LR-2026-052',
    employeeId: 'DF-1008',
    employeeName: 'Sophia Patel',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    department: 'Product',
    type: 'Paid Leave',
    from: '2026-07-20',
    to: '2026-07-24',
    days: 5,
    remarks: 'Annual summer vacation trip with family.',
    status: 'Approved',
    appliedDate: '2026-07-10',
    hrComment: 'Approved. Handover documentation confirmed with sprint lead.',
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    title: 'Smart Attendance Live',
    message: 'Good morning, Alex! Don’t forget to check in using smart geolocation capture.',
    timestamp: '10 mins ago',
    type: 'info',
    read: false,
    role: 'Employee'
  },
  {
    id: 'notif-2',
    title: 'Pending Leave Approvals',
    message: 'Alex Rivera and Priya Sharma submitted 2 new leave requests requiring HR review.',
    timestamp: '25 mins ago',
    type: 'warning',
    read: false,
    role: 'HR/Admin'
  },
  {
    id: 'notif-3',
    title: 'August Payroll Ready',
    message: 'August 2026 salary statements have been processed and are ready for payslip generation.',
    timestamp: '2 hours ago',
    type: 'success',
    read: false,
    role: 'All'
  },
  {
    id: 'notif-4',
    title: 'Labor Day Public Holiday',
    message: 'Upcoming company holiday on Monday, September 7, 2026. Offices will remain closed.',
    timestamp: '1 day ago',
    type: 'info',
    read: true,
    role: 'All'
  }
];

export const companyHolidays = [
  { name: 'Labor Day', date: 'Sep 07, 2026', type: 'Public Holiday', days: '1 Day' },
  { name: 'Thanksgiving Break', date: 'Nov 26 - 27, 2026', type: 'Company Holiday', days: '2 Days' },
  { name: 'Winter Holiday Festival', date: 'Dec 24 - 25, 2026', type: 'Public Holiday', days: '2 Days' },
  { name: 'New Year’s Day', date: 'Jan 01, 2027', type: 'Public Holiday', days: '1 Day' },
];

export const samplePayslipHistory = [
  {
    id: 'PAY-26JUL-DF-1001',
    period: 'July 2026',
    payDate: 'July 31, 2026',
    basic: 7500,
    allowances: 1800,
    deductions: 950,
    netSalary: 8350,
    status: 'Paid',
    generatedAt: '2026-07-31T18:00:00Z'
  },
  {
    id: 'PAY-26JUN-DF-1001',
    period: 'June 2026',
    payDate: 'June 30, 2026',
    basic: 7500,
    allowances: 1800,
    deductions: 950,
    netSalary: 8350,
    status: 'Paid',
    generatedAt: '2026-06-30T18:00:00Z'
  },
  {
    id: 'PAY-26MAY-DF-1001',
    period: 'May 2026',
    payDate: 'May 31, 2026',
    basic: 7500,
    allowances: 1800,
    deductions: 950,
    netSalary: 8350,
    status: 'Paid',
    generatedAt: '2026-05-31T18:00:00Z'
  }
];