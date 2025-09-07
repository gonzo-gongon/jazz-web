# コードベース構造

## ルートディレクトリ
```
jazz-web/
├── .serena/              # Serena設定
├── .claude/              # Claude Code設定  
├── src/                  # ソースコード
├── .wrangler/            # Wrangler作業ディレクトリ（ローカル）
├── package.json          # npm設定
├── wrangler.toml         # Cloudflare設定
├── biome.json           # リンター・フォーマッター設定
├── tsconfig.json        # TypeScript設定
├── tailwind.config.ts   # Tailwind CSS設定
├── next.config.ts       # Next.js設定
└── CLAUDE.md            # Claude Code設定
```

## src/ ディレクトリ詳細
```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # 全体レイアウト
│   ├── page.tsx         # ホームページ
│   └── globals.css      # グローバルCSS
├── components/          # Reactコンポーネント（未実装）
├── lib/                 # ユーティリティ・ライブラリ
│   └── apollo.ts        # Apollo GraphQLクライアント設定
└── types/               # TypeScript型定義
    └── index.ts         # 共通型定義
```

## 主要ファイル
- **src/app/page.tsx**: メインページ（検索UI）
- **src/types/index.ts**: Event, SearchFilters, SearchState型定義
- **src/lib/apollo.ts**: GraphQL クライアント設定
- **wrangler.toml**: D1データベース設定（jazz）

## 未実装・今後の拡張
- GraphQL スキーマ・リゾルバ
- データベースマイグレーション
- 認証機能
- 詳細検索コンポーネント