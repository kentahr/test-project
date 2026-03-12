"use client";

import { useCallback, useEffect, useState } from "react";
import KpiCard from "@/components/KpiCard";
import OverviewChart from "@/components/OverviewChart";
import TrafficSourcesChart from "@/components/TrafficSourcesChart";
import DeviceChart from "@/components/DeviceChart";
import TopPagesTable from "@/components/TopPagesTable";
import DateRangePicker from "@/components/DateRangePicker";

interface DashboardData {
  overview: {
    date: string;
    sessions: number;
    users: number;
    pageviews: number;
  }[];
  topPages: {
    path: string;
    title: string;
    pageviews: number;
    users: number;
    avgDuration: number;
  }[];
  trafficSources: { channel: string; sessions: number; users: number }[];
  devices: { device: string; sessions: number }[];
  kpi: {
    sessions: number;
    users: number;
    newUsers: number;
    pageviews: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("30daysAgo");
  const [endDate, setEndDate] = useState("today");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/ga4?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "APIエラー");
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "不明なエラー");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                GA4 ダッシュボード
              </h1>
              <p className="text-xs text-gray-400">Google Analytics 4</p>
            </div>
          </div>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onApply={fetchData}
            loading={loading}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            <strong>エラー:</strong> {error}
            <br />
            <span className="text-xs text-red-500">
              .env.local に GA4_PROPERTY_ID と認証情報が設定されているか確認してください。
            </span>
          </div>
        )}

        {loading && !data && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="inline-block w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3" />
              <p className="text-sm text-gray-500">データを読み込み中...</p>
            </div>
          </div>
        )}

        {data && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <KpiCard
                title="セッション"
                value={data.kpi.sessions.toLocaleString()}
                icon="🔄"
                color="bg-indigo-50"
              />
              <KpiCard
                title="ユーザー"
                value={data.kpi.users.toLocaleString()}
                icon="👤"
                color="bg-green-50"
              />
              <KpiCard
                title="新規ユーザー"
                value={data.kpi.newUsers.toLocaleString()}
                icon="✨"
                color="bg-yellow-50"
              />
              <KpiCard
                title="ページビュー"
                value={data.kpi.pageviews.toLocaleString()}
                icon="📄"
                color="bg-blue-50"
              />
              <KpiCard
                title="直帰率"
                value={`${(data.kpi.bounceRate * 100).toFixed(1)}%`}
                icon="↩️"
                color="bg-red-50"
              />
              <KpiCard
                title="平均セッション"
                value={formatDuration(data.kpi.avgSessionDuration)}
                subValue="分:秒"
                icon="⏱️"
                color="bg-purple-50"
              />
            </div>

            {/* Overview Chart */}
            <OverviewChart data={data.overview} />

            {/* Traffic + Device */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrafficSourcesChart data={data.trafficSources} />
              <DeviceChart data={data.devices} />
            </div>

            {/* Top Pages */}
            <TopPagesTable data={data.topPages} />
          </>
        )}
      </main>
    </div>
  );
}
