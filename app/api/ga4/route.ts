import { NextRequest, NextResponse } from "next/server";
import {
  fetchOverviewMetrics,
  fetchTopPages,
  fetchTrafficSources,
  fetchDeviceCategories,
  fetchKpiSummary,
  DateRange,
} from "@/lib/ga4";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate") ?? "30daysAgo";
  const endDate = searchParams.get("endDate") ?? "today";
  const dateRange: DateRange = { startDate, endDate };

  try {
    const [overview, topPages, trafficSources, devices, kpi] =
      await Promise.all([
        fetchOverviewMetrics(dateRange),
        fetchTopPages(dateRange),
        fetchTrafficSources(dateRange),
        fetchDeviceCategories(dateRange),
        fetchKpiSummary(dateRange),
      ]);

    return NextResponse.json({
      overview,
      topPages,
      trafficSources,
      devices,
      kpi,
    });
  } catch (error) {
    console.error("GA4 API error:", error);
    const message =
      error instanceof Error ? error.message : "不明なエラーが発生しました";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
