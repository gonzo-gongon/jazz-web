# コードベース構造

## プロジェクトルート
```
jazz-web/
├── app/                    # Next.js App Router
├── components/             # Reactコンポーネント
├── hooks/                  # カスタムフック
├── lib/                    # ユーティリティ・設定
├── generated/              # GraphQL自動生成ファイル
├── public/                 # 静的ファイル
└── 設定ファイル群
```

## app/ ディレクトリ
- `layout.tsx`: ルートレイアウト
- `page.tsx`: ホームページ (HomePage)
- `loading.tsx`: ローディングUI
- `globals.css`: グローバルスタイル

## components/ ディレクトリ
- `ui/`: shadcn/uiコンポーネント
  - button, card, dialog, input, calendar等
- `event-calendar.tsx`: イベントカレンダーコンポーネント
- `event-search.tsx`: イベント検索コンポーネント
- `jazz-header.tsx`: ヘッダーコンポーネント
- `providers.tsx`: プロバイダー設定

## lib/ ディレクトリ
- `apollo.ts`: Apollo Clientの設定
- `queries.ts`: GraphQLクエリ定義 (SEARCH_EVENTS)
- `utils.ts`: ユーティリティ関数

## hooks/ ディレクトリ
- `use-search-events.ts`: イベント検索カスタムフック

## generated/ ディレクトリ
- `graphql.ts`: GraphQL Code Generatorによる自動生成ファイル

## 設定ファイル
- `package.json`: 依存関係・スクリプト
- `next.config.ts`: Next.js設定
- `wrangler.toml`: Cloudflare設定
- `biome.json`: Biome設定
- `codegen.yml`: GraphQL Code Generator設定
- `tsconfig.json`: TypeScript設定