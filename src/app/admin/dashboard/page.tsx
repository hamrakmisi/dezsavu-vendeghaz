'use client';

import React, { useState } from 'react';
import StatCard from './components/Card';
import DashboardWrapper from './components/DashboardWrapper';

export default function page() {

  const stats = {
    reservationCount: 124,
    avgLength: 3.2,
    medianLength: 3,
    pricePerNight: 15000,
    returningCustomerPercentage: 24,
    cancelledCount: 8,
    pendingCount: 12,
    completedCount: 104,
  };

  return (
    <DashboardWrapper>
      <StatCard title="Foglalások száma" value={stats.reservationCount} suffix="db" />
      <StatCard title="Átlagos hossz" value={stats.avgLength} suffix="éj" />
      <StatCard title="Medián hossz" value={stats.medianLength} suffix="éj" />
      <StatCard title="Ár / éjszaka" value={stats.pricePerNight.toLocaleString('hu-HU')} suffix="Ft" />
      <StatCard title="Visszatérő vendégek" value={stats.returningCustomerPercentage} suffix="%" />
      <StatCard title="Lemondott foglalás" value={stats.cancelledCount} suffix="db" color="text-error" />
      <StatCard title="Függőben" value={stats.pendingCount} suffix="db" color="text-warning" />
      <StatCard title="Teljesítve" value={stats.completedCount} suffix="db" color="text-success" />
    </DashboardWrapper>
  );
}


