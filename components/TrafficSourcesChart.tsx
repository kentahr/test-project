"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TrafficSource {
  channel: string;
  sessions: number;
  users: number;
}

interface TrafficSourcesChartProps {
  data: TrafficSource[];
}

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
  "#8b5cf6",
];

export default function TrafficSourcesChart({
  data,
}: TrafficSourcesChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        流入チャネル別セッション
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="sessions"
            nameKey="channel"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [
              Number(value).toLocaleString(),
              "セッション",
            ]}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
