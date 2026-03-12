"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";

interface OverviewData {
  date: string;
  sessions: number;
  users: number;
  pageviews: number;
}

interface OverviewChartProps {
  data: OverviewData[];
}

function formatDate(dateStr: string) {
  try {
    const d = parse(dateStr, "yyyyMMdd", new Date());
    return format(d, "M/d", { locale: ja });
  } catch {
    return dateStr;
  }
}

export default function OverviewChart({ data }: OverviewChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    dateLabel: formatDate(d.date),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        セッション・ユーザー・ページビュー推移
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 11 }}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#6366f1"
            name="セッション"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#22c55e"
            name="ユーザー"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="pageviews"
            stroke="#f59e0b"
            name="ページビュー"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
