"use client";

interface KpiCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: string;
  color: string;
}

export default function KpiCard({
  title,
  value,
  subValue,
  icon,
  color,
}: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${color}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
      </div>
    </div>
  );
}
