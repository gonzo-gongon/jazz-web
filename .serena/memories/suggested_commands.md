# 推奨コマンド

## 開発サーバー
```bash
npm run dev                    # Next.js開発サーバー起動
npm run preview               # Cloudflare Pages ローカルプレビュー
```

## ビルド・デプロイ
```bash
npm run build                 # Next.jsビルド
npm run pages:build          # Cloudflare Pages用ビルド
npm run deploy               # Cloudflareにデプロイ
```

## コード品質
```bash
npm run lint                 # Biomeリンターチェック
npm run lint:fix            # Biomeリンター自動修正
npm run format              # Biomeフォーマッター実行
```

## データベース（D1）
```bash
npx wrangler d1 migrations apply jazz --local    # ローカルマイグレーション実行
npx wrangler d1 execute jazz --local --file=./seed/seed.sql  # シードデータ投入
sqlite3 .wrangler/state/d1/jazz.sqlite          # SQLite直接操作
```

## Cloudflare関連
```bash
npm run cf-typegen          # Cloudflare型定義生成
wrangler pages dev          # Pages開発サーバー
wrangler pages deploy       # Pagesデプロイ
```

## システム基本コマンド (macOS)
```bash
ls -la                      # ファイル一覧表示
cd <directory>             # ディレクトリ移動
grep -r <pattern> <dir>    # パターン検索
find . -name <pattern>     # ファイル検索
git status                 # Git状態確認
```