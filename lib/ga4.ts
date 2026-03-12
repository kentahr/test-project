import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA4_PROPERTY_ID;

function createClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (email && privateKey) {
    return new BetaAnalyticsDataClient({
      credentials: { client_email: email, private_key: privateKey },
    });
  }
  // GOOGLE_APPLICATION_CREDENTIALS 環境変数を使用
  return new BetaAnalyticsDataClient();
}

export const analyticsClient = createClient();

export function getPropertyId() {
  if (!propertyId) throw new Error("GA4_PROPERTY_ID が設定されていません");
  return propertyId;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// セッション数・ユーザー数・ページビュー数の時系列データ
export async function fetchOverviewMetrics(dateRange: DateRange) {
  const client = analyticsClient;
  const [response] = await client.runReport({
    property: `properties/${getPropertyId()}`,
    dateRanges: [dateRange],
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "screenPageViews" },
    ],
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  return (
    response.rows?.map((row) => ({
      date: row.dimensionValues?.[0]?.value ?? "",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
      users: Number(row.metricValues?.[1]?.value ?? 0),
      pageviews: Number(row.metricValues?.[2]?.value ?? 0),
    })) ?? []
  );
}

// トップページランキング
export async function fetchTopPages(
  dateRange: DateRange,
  limit: number = 10
) {
  const client = analyticsClient;
  const [response] = await client.runReport({
    property: `properties/${getPropertyId()}`,
    dateRanges: [dateRange],
    dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
    ],
    orderBys: [
      { metric: { metricName: "screenPageViews" }, desc: true },
    ],
    limit,
  });

  return (
    response.rows?.map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "",
      title: row.dimensionValues?.[1]?.value ?? "",
      pageviews: Number(row.metricValues?.[0]?.value ?? 0),
      users: Number(row.metricValues?.[1]?.value ?? 0),
      avgDuration: Number(row.metricValues?.[2]?.value ?? 0),
    })) ?? []
  );
}

// 流入元ランキング
export async function fetchTrafficSources(
  dateRange: DateRange,
  limit: number = 8
) {
  const client = analyticsClient;
  const [response] = await client.runReport({
    property: `properties/${getPropertyId()}`,
    dateRanges: [dateRange],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit,
  });

  return (
    response.rows?.map((row) => ({
      channel: row.dimensionValues?.[0]?.value ?? "",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
      users: Number(row.metricValues?.[1]?.value ?? 0),
    })) ?? []
  );
}

// デバイスカテゴリ別
export async function fetchDeviceCategories(dateRange: DateRange) {
  const client = analyticsClient;
  const [response] = await client.runReport({
    property: `properties/${getPropertyId()}`,
    dateRanges: [dateRange],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });

  return (
    response.rows?.map((row) => ({
      device: row.dimensionValues?.[0]?.value ?? "",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? []
  );
}

// KPIサマリー（直帰率・平均セッション時間含む）
export async function fetchKpiSummary(dateRange: DateRange) {
  const client = analyticsClient;
  const [response] = await client.runReport({
    property: `properties/${getPropertyId()}`,
    dateRanges: [dateRange],
    metrics: [
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "newUsers" },
      { name: "screenPageViews" },
      { name: "bounceRate" },
      { name: "averageSessionDuration" },
    ],
  });

  const row = response.rows?.[0];
  return {
    sessions: Number(row?.metricValues?.[0]?.value ?? 0),
    users: Number(row?.metricValues?.[1]?.value ?? 0),
    newUsers: Number(row?.metricValues?.[2]?.value ?? 0),
    pageviews: Number(row?.metricValues?.[3]?.value ?? 0),
    bounceRate: Number(row?.metricValues?.[4]?.value ?? 0),
    avgSessionDuration: Number(row?.metricValues?.[5]?.value ?? 0),
  };
}
