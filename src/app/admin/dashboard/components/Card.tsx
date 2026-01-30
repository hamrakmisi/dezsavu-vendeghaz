'use client'

export default function StatCard({ title, value, suffix, color }: { title: string; value: string | number; suffix?: string; color?: string }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-header">{title}</h2>
        <p className={`text-3xl font-bold ${color || ''}`}>
          {value} <span className="text-sm font-normal text-content2">{suffix}</span>
        </p>
      </div>
    </div>
  );
}