// src/context/HrmsContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from './AuthContext';
import { employeeService } from '../services/employeeService';
import { attendanceService } from '../services/attendanceService';
import { leaveService } from '../services/leaveService';
import { payrollService } from '../services/payrollService';
import { notificationService } from '../services/notificationService';
import { generateAttendanceHeatmap, calculateAttendanceMetrics } from '../utils/attendanceUtils';
import { analyzeWorkforceLeaveInsights } from '../utils/leaveInsights';
import { generatePayslipPdf } from '../utils/pdfGenerator';
import { generatePayslipRef } from '../utils/payrollUtils';
import {
  initialEmployees,
  initialLeaveRequests,
  initialNotifications,
  samplePayslipHistory
} from '../services/mockHrmsData';

const HrmsContext = createContext();

export function HrmsProvider({ children }) {
  const { currentUser } = useAuth();
  const currentEmpId = currentUser?.id || 'DF-1001';

  // 1. Core State Collections
  const [employees, setEmployees] = useState(() => employeeService.getAllEmployees());
  const [leaveRequests, setLeaveRequests] = useState(() => leaveService.getLeaveRequests());
  const [notifications, setNotifications] = useState(() => notificationService.getNotifications());
  const [payslips, setPayslips] = useState(() => payrollService.getPayslipHistory(currentEmpId));
  
  // 2. Attendance State for Current Active Employee
  const [todayAttendance, setTodayAttendance] = useState(() => attendanceService.getTodayStatus(currentEmpId));
  const [attendanceRecords, setAttendanceRecords] = useState(() => attendanceService.getAttendanceRecords(currentEmpId));
  const [workingSeconds, setWorkingSeconds] = useState(0);

  // 3. UI Global States
  const [toasts, setToasts] = useState([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // Synchronize state when switching employees
  useEffect(() => {
    if (currentUser?.id) {
      const todayStatus = attendanceService.getTodayStatus(currentUser.id);
      setTodayAttendance(todayStatus);
      setAttendanceRecords(attendanceService.getAttendanceRecords(currentUser.id));
      setPayslips(payrollService.getPayslipHistory(currentUser.id));
      
      if (todayStatus.status === 'working' && todayStatus.startedAt) {
        const elapsed = Math.floor((Date.now() - new Date(todayStatus.startedAt).getTime()) / 1000);
        setWorkingSeconds(Math.max(elapsed, todayStatus.workingSeconds || 0));
      } else {
        setWorkingSeconds(todayStatus.workingSeconds || 0);
      }
    }
  }, [currentUser?.id]);

  // Live Working Seconds Timer
  useEffect(() => {
    let interval = null;
    if (todayAttendance.status === 'working') {
      interval = setInterval(() => {
        setWorkingSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [todayAttendance.status]);

  // Toast dispatcher
  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Check-In Action (Smart Attendance with Geolocation)
  const handleCheckIn = async (withFace = false) => {
    try {
      showToast('Capturing GPS coordinates and verifying network...', 'info', 2000);
      const loc = await attendanceService.captureLocation();
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toISOString().split('T')[0];

      const newToday = {
        status: 'working',
        checkInTime: timeStr,
        checkOutTime: null,
        checkInDate: dateStr,
        location: loc,
        faceVerified: withFace,
        workingSeconds: 0,
        startedAt: now.toISOString()
      };

      setTodayAttendance(newToday);
      setWorkingSeconds(0);
      attendanceService.saveTodayStatus(currentEmpId, newToday);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {
        // Safe fallback
      }

      showToast('Location verified ✓ Check-in successful! Have a productive day.', 'success');

      // Add Notification
      const updatedNotifs = notificationService.addNotification({
        title: 'Check-in Confirmed',
        message: `You checked in at ${timeStr} from ${loc.address}.`,
        type: 'success',
        role: 'Employee'
      });
      setNotifications(updatedNotifs);

      return newToday;
    } catch (err) {
      showToast('Check-in failed. Please retry.', 'error');
      throw err;
    }
  };

  // Check-Out Action
  const handleCheckOut = async () => {
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toISOString().split('T')[0];
      const hoursDecimal = parseFloat((workingSeconds / 3600).toFixed(2));

      const updatedToday = {
        ...todayAttendance,
        status: 'checked_out',
        checkOutTime: timeStr,
        workingSeconds: workingSeconds,
        finalHours: hoursDecimal
      };

      setTodayAttendance(updatedToday);
      attendanceService.saveTodayStatus(currentEmpId, updatedToday);

      // Save historical record
      const newRecord = {
        date: dateStr,
        checkIn: todayAttendance.checkInTime || '09:00 AM',
        checkOut: timeStr,
        hours: Math.max(hoursDecimal, 0.1),
        status: hoursDecimal < 4 ? 'half_day' : 'present',
        location: todayAttendance.location?.address || 'San Francisco HQ'
      };

      const updatedRecords = attendanceService.saveAttendanceRecord(currentEmpId, newRecord);
      setAttendanceRecords(updatedRecords);

      showToast(`Check-out recorded at ${timeStr}! Total duration: ${Math.floor(workingSeconds / 3600)}h ${Math.floor((workingSeconds % 3600) / 60)}m`, 'success');

      const updatedNotifs = notificationService.addNotification({
        title: 'Check-out Recorded',
        message: `Work session closed at ${timeStr}. Attendance log synced.`,
        type: 'info',
        role: 'Employee'
      });
      setNotifications(updatedNotifs);

      return updatedToday;
    } catch (err) {
      showToast('Check-out failed', 'error');
      throw err;
    }
  };

  // Reset Today Attendance (convenient for testing demo check-in again)
  const handleResetTodayAttendance = () => {
    const res = attendanceService.resetTodayAttendance(currentEmpId);
    setTodayAttendance(res);
    setWorkingSeconds(0);
    showToast('Today’s attendance reset to "Not Checked In" for live testing.', 'info');
  };

  // Leave Management Actions
  const handleApplyLeave = async (leaveData) => {
    const newReq = leaveService.applyLeave({
      employeeId: currentUser?.id || 'DF-1001',
      employeeName: currentUser?.name || 'Alex Rivera',
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: currentUser?.department || 'Engineering',
      ...leaveData
    });

    const allRequests = leaveService.getLeaveRequests();
    setLeaveRequests(allRequests);

    // Notify HR / Admin
    const updatedNotifs = notificationService.addNotification({
      title: 'New Leave Application',
      message: `${currentUser?.name} applied for ${newReq.days} day(s) of ${newReq.type}.`,
      type: 'warning',
      role: 'HR/Admin'
    });
    setNotifications(updatedNotifs);

    showToast('Leave request submitted successfully. Pending HR review.', 'success');
    return newReq;
  };

  const handleApproveLeave = (requestId, hrComment = '') => {
    const updatedReq = leaveService.approveLeave(requestId, hrComment);
    const allRequests = leaveService.getLeaveRequests();
    setLeaveRequests(allRequests);

    // Confetti effect on approval
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // Notify Employee
    const updatedNotifs = notificationService.addNotification({
      title: 'Leave Request Approved',
      message: `Your ${updatedReq.type} request (${updatedReq.from} to ${updatedReq.to}) has been approved by HR.`,
      type: 'success',
      role: 'Employee'
    });
    setNotifications(updatedNotifs);

    showToast(`Leave request for ${updatedReq.employeeName} approved!`, 'success');
  };

  const handleRejectLeave = (requestId, hrComment) => {
    const updatedReq = leaveService.rejectLeave(requestId, hrComment);
    const allRequests = leaveService.getLeaveRequests();
    setLeaveRequests(allRequests);

    // Notify Employee
    const updatedNotifs = notificationService.addNotification({
      title: 'Leave Request Status Update',
      message: `Your ${updatedReq.type} request was declined. Reason: ${hrComment}`,
      type: 'error',
      role: 'Employee'
    });
    setNotifications(updatedNotifs);

    showToast(`Leave request for ${updatedReq.employeeName} rejected with feedback.`, 'info');
  };

  const handleCancelLeave = (requestId) => {
    const updated = leaveService.cancelLeave(requestId);
    setLeaveRequests(updated);
    showToast('Leave request cancelled.', 'info');
  };

  // Payroll Actions
  const handleUpdateSalary = (employeeId, newSalary) => {
    const updatedEmp = employeeService.updateEmployee(employeeId, { salary: newSalary });
    const all = employeeService.getAllEmployees();
    setEmployees(all);
    showToast(`Updated compensation package for ${updatedEmp.name}.`, 'success');
    return updatedEmp;
  };

  // Generate Payslip PDF Action (Innovation Feature #3)
  const handleGeneratePayslipPdf = (employeeObj, period = 'August 2026') => {
    const emp = employeeObj || employees.find(e => e.id === currentEmpId) || initialEmployees[0];
    const sal = emp.salary || { basic: 7500, allowances: 1800, deductions: 950, netSalary: 8350 };
    
    // Generate the PDF
    const fileName = generatePayslipPdf({
      employeeName: emp.name,
      employeeId: emp.id,
      department: emp.department,
      designation: emp.designation,
      payPeriod: period,
      payDate: 'August 31, 2026',
      basic: sal.basic,
      allowances: sal.allowances,
      deductions: sal.deductions,
      netSalary: sal.netSalary,
      bankAccount: sal.bankAccount,
      taxId: sal.taxId
    });

    // Save payslip record
    const payslipRecord = {
      id: generatePayslipRef(emp.id, period.split(' ')[0], '2026'),
      period,
      payDate: 'August 31, 2026',
      basic: sal.basic,
      allowances: sal.allowances,
      deductions: sal.deductions,
      netSalary: sal.netSalary,
      status: 'Paid',
      generatedAt: new Date().toISOString()
    };

    const updatedPayslips = payrollService.savePayslip(emp.id, payslipRecord);
    if (emp.id === currentEmpId) {
      setPayslips(updatedPayslips);
    }

    // Add Live Notification
    const updatedNotifs = notificationService.addNotification({
      title: 'New Payslip Available',
      message: `Your payslip for ${period} ($${sal.netSalary.toLocaleString()}) is now available for download.`,
      type: 'success',
      role: 'Employee'
    });
    setNotifications(updatedNotifs);

    showToast(`Payslip for ${emp.name} generated & downloaded successfully!`, 'success');
    return fileName;
  };

  // Employee Profile Actions
  const handleUpdateProfile = (employeeId, updatedFields) => {
    const updated = employeeService.updateEmployee(employeeId, updatedFields);
    const all = employeeService.getAllEmployees();
    setEmployees(all);
    showToast('Profile updated successfully.', 'success');
    return updated;
  };

  // Notification Actions
  const handleMarkNotifAsRead = (id) => {
    const updated = notificationService.markAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllNotifsAsRead = () => {
    const updated = notificationService.markAllAsRead();
    setNotifications(updated);
    showToast('All notifications marked as read.', 'info');
  };

  const handleClearNotifications = () => {
    notificationService.clearAll();
    setNotifications([]);
    showToast('Notifications cleared.', 'info');
  };

  // Reset entire demo data to clean slate
  const handleResetDemoData = () => {
    localStorage.removeItem('dayflow_leave_requests');
    localStorage.removeItem('dayflow_notifications');
    localStorage.removeItem('dayflow_all_employees');
    localStorage.removeItem(`dayflow_today_status_${currentEmpId}`);
    localStorage.removeItem(`dayflow_attendance_records_${currentEmpId}`);
    localStorage.removeItem(`dayflow_payroll_history_${currentEmpId}`);

    setEmployees(initialEmployees);
    setLeaveRequests(initialLeaveRequests);
    setNotifications(initialNotifications);
    setPayslips(samplePayslipHistory);
    setTodayAttendance(attendanceService.getTodayStatus(currentEmpId));
    setWorkingSeconds(0);
    setAttendanceRecords([]);

    showToast('System data reset to initial showcase demo state!', 'info');
  };

  // Derived Values
  const heatmapDays = generateAttendanceHeatmap(attendanceRecords);
  const attendanceMetrics = calculateAttendanceMetrics(heatmapDays);
  const smartInsights = analyzeWorkforceLeaveInsights(employees, leaveRequests, attendanceRecords);

  const pendingLeavesCount = leaveRequests.filter(r => r.status === 'Pending').length;
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <HrmsContext.Provider
      value={{
        // Employees & Profile
        employees,
        currentEmployee: employees.find(e => e.id === currentEmpId) || employees[0],
        updateEmployeeSalary: handleUpdateSalary,
        updateEmployeeProfile: handleUpdateProfile,
        
        // Attendance & Live Clock
        todayAttendance,
        workingSeconds,
        checkIn: handleCheckIn,
        checkOut: handleCheckOut,
        resetTodayAttendance: handleResetTodayAttendance,
        attendanceRecords,
        heatmapDays,
        attendanceMetrics,
        isCameraModalOpen,
        setIsCameraModalOpen,

        // Leaves
        leaveRequests,
        pendingLeavesCount,
        applyLeave: handleApplyLeave,
        approveLeave: handleApproveLeave,
        rejectLeave: handleRejectLeave,
        cancelLeave: handleCancelLeave,

        // Payroll & Payslips
        payslips,
        generatePayslipPdfAction: handleGeneratePayslipPdf,

        // Smart Workforce Insights
        smartInsights,

        // Notifications & Toasts
        notifications,
        unreadNotifsCount,
        markNotifAsRead: handleMarkNotifAsRead,
        markAllNotifsAsRead: handleMarkAllNotifsAsRead,
        clearNotifications: handleClearNotifications,
        toasts,
        showToast,
        removeToast,

        // Global Search & Reset
        globalSearch,
        setGlobalSearch,
        resetDemoData: handleResetDemoData
      }}
    >
      {children}
    </HrmsContext.Provider>
  );
}

export function useHrms() {
  const context = useContext(HrmsContext);
  if (!context) throw new Error('useHrms must be used within HrmsProvider');
  return context;
}
