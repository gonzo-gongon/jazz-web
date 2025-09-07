# 技術スタック

## フロントエンド
- **Next.js 15.5.2**: React フレームワーク
- **React 19**: UI ライブラリ
- **TypeScript 5**: 型安全性
- **Tailwind CSS 4.1.12**: スタイリング
- **Apollo Client 4.0.3**: GraphQL クライアント

## バックエンド・インフラ
- **Cloudflare Pages**: ホスティング
- **Cloudflare Workers**: サーバーサイド処理
- **Cloudflare D1**: SQLite ベースのデータベース
- **Wrangler**: Cloudflare 開発ツール

## 開発ツール
- **Biome**: リンター・フォーマッター（ESLint/Prettier代替）
- **PostCSS + Autoprefixer**: CSS処理
- **@cloudflare/next-on-pages**: Next.js → Cloudflare Pages 変換

## パッケージ管理
- **npm**: パッケージマネージャー
- **Node.js 18.17.0+**: 実行環境

## 設定ファイル
- `wrangler.toml`: Cloudflare設定
- `biome.json`: コード品質設定
- `tsconfig.json`: TypeScript設定
- `tailwind.config.ts`: Tailwindスタイル設定