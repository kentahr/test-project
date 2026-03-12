"use client";

interface PageData {
  path: string;
  title: string;
  pageviews: number;
  users: number;
  avgDuration: number;
}

interface TopPagesTableProps {
  data: PageData[];
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function TopPagesTable({ data }: TopPagesTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        人気ページ TOP10
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                ページ
              </th>
              <th className="text-right py-2 px-2 text-gray-500 font-medium whitespace-nowrap">
                PV数
              </th>
              <th className="text-right py-2 px-2 text-gray-500 font-medium whitespace-nowrap">
                ユーザー
              </th>
              <th className="text-right py-2 pl-2 text-gray-500 font-medium whitespace-nowrap">
                平均時間
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((page, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-2.5 pr-4">
                  <div
                    className="font-medium text-gray-800 truncate max-w-xs"
                    title={page.title}
                  >
                    {page.title || page.path}
                  </div>
                  <div className="text-xs text-gray-400 truncate max-w-xs">
                    {page.path}
                  </div>
                </td>
                <td className="text-right py-2.5 px-2 font-semibold text-gray-700">
                  {page.pageviews.toLocaleString()}
                </td>
                <td className="text-right py-2.5 px-2 text-gray-600">
                  {page.users.toLocaleString()}
                </td>
                <td className="text-right py-2.5 pl-2 text-gray-600">
                  {formatDuration(page.avgDuration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
