"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DeviceData {
  device: string;
  sessions: number;
}

interface DeviceChartProps {
  data: DeviceData[];
}

const DEVICE_LABELS: Record<string, string> = {
  desktop: "デスクトップ",
  mobile: "モバイル",
  tablet: "タブレット",
};

export default function DeviceChart({ data }: DeviceChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    deviceLabel: DEVICE_LABELS[d.device] ?? d.device,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        デバイス別セッション
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="deviceLabel"
            tick={{ fontSize: 12 }}
            width={80}
          />
          <Tooltip
            formatter={(value) => [
              Number(value).toLocaleString(),
              "セッション",
            ]}
          />
          <Bar dataKey="sessions" fill="#6366f1" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
