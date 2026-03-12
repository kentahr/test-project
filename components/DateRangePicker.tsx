"use client";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
  onApply: () => void;
  loading: boolean;
}

const PRESETS = [
  { label: "今日", start: "today", end: "today" },
  { label: "昨日", start: "yesterday", end: "yesterday" },
  { label: "過去7日", start: "7daysAgo", end: "today" },
  { label: "過去30日", start: "30daysAgo", end: "today" },
  { label: "過去90日", start: "90daysAgo", end: "today" },
];

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
  loading,
}: DateRangePickerProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap gap-1">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              onStartDateChange(p.start);
              onEndDateChange(p.end);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              startDate === p.start && endDate === p.end
                ? "bg-indigo-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 ml-2">
        <input
          type="date"
          value={startDate.endsWith("Ago") ? "" : startDate === "today" || startDate === "yesterday" ? "" : startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <span className="text-gray-400">〜</span>
        <input
          type="date"
          value={endDate === "today" || endDate === "yesterday" ? "" : endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={onApply}
          disabled={loading}
          className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "読込中..." : "適用"}
        </button>
      </div>
    </div>
  );
}
