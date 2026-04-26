'use client';

import React, { useState, useEffect } from 'react';
import StatCard from './components/Card';
import PriceCard from './components/PriceCard';
import DashboardWrapper from './components/DashboardWrapper';
import { DashboardData } from '@/lib/types';

export default function page() {
  const ranges = ['Ez a hónap', 'Előző hónap', 'Előző 6 hónap', 'Előző 12 hónap', 'Ez az év', 'Összes'];
  const [timeRange, setTimeRange] = useState('Ez a hónap');
  const [data, setData] = useState<DashboardData | null>(null);
  const [pricePerNight, setPricePerNight] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/dashboard?filter=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { data } = await res.json();

      console.log(data);

      setData(data.data);
      setPricePerNight(data.pricePerNight);
    }

    getData();
  }, [timeRange]);

  const stats = {
    reservationCount: data?.reservationCount || 0,
    avgLength: data?.avgLength?.toFixed(2) || 0,
    medianLength: data?.medianLength || 0,
    pricePerNight: pricePerNight || 0,
    returningCustomerPercentage: data?.returningCustomerPercentage?.toFixed(2) || 0,
    cancelledCount: data?.cancelledCount || 0,
    pendingCount: data?.pendingCount || 0,
    completedCount: data?.completedCount || 0,
  };

  return (
    <DashboardWrapper timeRange={timeRange} setTimeRange={setTimeRange} ranges={ranges}>
      <StatCard title="Foglalások száma" value={stats.reservationCount} suffix="db" />
      <StatCard title="Lemondott foglalás" value={stats.cancelledCount} suffix="db" color="text-error" />
      <StatCard title="Függőben" value={stats.pendingCount} suffix="db" color="text-warning" />
      <StatCard title="Teljesítve" value={stats.completedCount} suffix="db" color="text-success" />
      <StatCard title="Átlagos hossz" value={stats.avgLength} suffix="éj" />
      <StatCard title="Medián hossz" value={stats.medianLength} suffix="éj" />
      <StatCard title="Visszatérő vendégek" value={stats.returningCustomerPercentage} suffix="%" />
      <PriceCard value={pricePerNight} />
    </DashboardWrapper>
  );
}

