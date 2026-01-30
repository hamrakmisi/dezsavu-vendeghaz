'use client';

import React, { useState } from 'react';

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const [timeRange, setTimeRange] = useState('1M');

  const ranges = ['1M', '6M', '1Y', '5Y', 'Mind'];

  return (
    <div className="p-6 space-y-6 h-screen flex flex-col justify-center">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Irányítópult</h1>

        <div className="btn-group btn-group-scrollable">
          {ranges.map((range) => (
            <button
              key={range}
              className={`btn ${timeRange === range ? 'btn-primary' : ''}`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
}