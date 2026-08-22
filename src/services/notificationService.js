// src/services/notificationService.js
import { initialNotifications } from './mockHrmsData';

const NOTIF_STORAGE_KEY = 'dayflow_notifications';

export const notificationService = {
  getNotifications() {
    try {
      const stored = localStorage.getItem(NOTIF_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading notifications', e);
    }
    return initialNotifications;
  },

  saveNotifications(notifications) {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(notifications));
  },

  addNotification(notif) {
    const notifications = this.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
      role: 'All',
      ...notif
    };
    const updated = [newNotif, ...notifications];
    this.saveNotifications(updated);
    return updated;
  },

  markAsRead(id) {
    const notifications = this.getNotifications();
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    this.saveNotifications(updated);
    return updated;
  },

  markAllAsRead() {
    const notifications = this.getNotifications();
    const updated = notifications.map(n => ({ ...n, read: true }));
    this.saveNotifications(updated);
    return updated;
  },

  clearAll() {
    this.saveNotifications([]);
    return [];
  }
};