# GA4 ダッシュボード

Google Analytics 4 のデータをリアルタイムで可視化する Next.js ダッシュボードです。

## 機能

- **KPI サマリー**: セッション数・ユーザー数・新規ユーザー・PV数・直帰率・平均セッション時間
- **時系列グラフ**: セッション / ユーザー / ページビューの推移（折れ線グラフ）
- **流入チャネル**: チャネル別セッション数（円グラフ）
- **デバイス別**: デスクトップ / モバイル / タブレット（横棒グラフ）
- **人気ページ TOP10**: PV数・ユーザー数・平均滞在時間付きテーブル
- **日付範囲フィルター**: プリセット（今日 / 過去7日 / 30日 / 90日）＆カスタム日付

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. Google Cloud の設定

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. **Google Analytics Data API** を有効化
3. サービスアカウントを作成し、JSON キーをダウンロード
4. GA4 プロパティの「プロパティのアクセス管理」でサービスアカウントに **閲覧者** 権限を付与

### 3. 環境変数の設定

```bash
cp .env.local.example .env.local
```

`.env.local` を編集：

```env
GA4_PROPERTY_ID=123456789

# オプション A: サービスアカウントJSONファイル
GOOGLE_APPLICATION_CREDENTIALS=./credentials/service-account.json

# オプション B: 直接環境変数で設定
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4. 開発サーバー起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **グラフ**: Recharts
- **GA4 API**: `@google-analytics/data`
- **日付処理**: `date-fns`

## ファイル構成

```
├── app/
│   ├── api/ga4/route.ts        # GA4 Data API エンドポイント
│   └── page.tsx                # ダッシュボードページ
├── components/
│   ├── KpiCard.tsx             # KPI カード
│   ├── OverviewChart.tsx       # 時系列グラフ
│   ├── TrafficSourcesChart.tsx # 流入チャネル円グラフ
│   ├── DeviceChart.tsx         # デバイス別棒グラフ
│   ├── TopPagesTable.tsx       # 人気ページテーブル
│   └── DateRangePicker.tsx     # 日付範囲ピッカー
└── lib/
    └── ga4.ts                  # GA4 API クライアント・クエリ関数
```
