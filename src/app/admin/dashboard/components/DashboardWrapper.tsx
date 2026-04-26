'use client';

import React from 'react';

export default function DashboardWrapper({ children, timeRange, setTimeRange, ranges }: { children: React.ReactNode, timeRange: string, setTimeRange: (timeRange: string) => void, ranges: string[] }) {

  return (
    <div className="p-6 space-y-6 py-48 flex flex-col justify-center">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <h1 className="text-3xl font-bold">Irányítópult</h1>
        <div className="btn-group">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {children}
      </div>
    </div>
  );
}