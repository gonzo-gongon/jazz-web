# コードスタイル・規約

## Biome設定 (biome.json)
- **インデント**: 2スペース
- **行幅**: 80文字
- **クォート**: ダブルクォート ("") 
- **セミコロン**: 必要時のみ (asNeeded)
- **末尾カンマ**: ES5準拠

## TypeScript規約
- **strictモード**: 有効
- **型注釈**: 明示的に記述
- **インポート**: `@/*` エイリアス使用可能

## ファイル構成
```
src/
├── app/           # Next.js App Router
├── components/    # React コンポーネント
├── lib/          # ユーティリティ・設定
└── types/        # TypeScript型定義
```

## 命名規則
- **コンポーネント**: PascalCase (`HomePage`, `SearchForm`)
- **関数・変数**: camelCase (`handleSearch`, `searchQuery`)
- **型定義**: PascalCase (`SearchFilters`, `Event`)
- **定数**: UPPER_SNAKE_CASE
- **ファイル名**: kebab-case または PascalCase

## React規約
- **関数コンポーネント**: アロー関数または通常関数
- **Hooks**: use-プレフィックス
- **Props**: 型定義必須
- **JSX**: 明示的な型注釈 (`JSX.Element`)

## CSS規約
- **Tailwind CSS**: ユーティリティファーストアプローチ
- **レスポンシブ**: `md:`, `lg:` プレフィックス使用
- **カスタムスタイル**: 必要に応じてCSS Modules