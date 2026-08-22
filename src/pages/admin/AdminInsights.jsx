// src/pages/admin/AdminInsights.jsx
import React from 'react';
import { SmartLeaveInsightsPanel } from '../../components/hr/SmartLeaveInsightsPanel';

export function AdminInsights() {
  return (
    <div className="space-y-6">
      <SmartLeaveInsightsPanel />
    </div>
  );
}