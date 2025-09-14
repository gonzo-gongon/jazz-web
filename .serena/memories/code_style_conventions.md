# コーディング規約

## フォーマッター・リンター
- **Biome**: コードフォーマッター・リンター
  - `npm run lint`: チェック実行
  - `npm run lint:fix`: 自動修正
  - `npm run format`: フォーマット実行

## TypeScript設定
- 厳格なTypeScript設定
- ビルド時のエラーを無視する設定（`ignoreBuildErrors: true`）
- ESLintチェックをビルド時に無視（`ignoreDuringBuilds: true`）

## コンポーネント命名規約
- Reactコンポーネント: PascalCase
- ファイル名: kebab-case (例: `event-calendar.tsx`)
- カスタムフック: `use-` プレフィックス

## ディレクトリ構造
- `components/ui/`: 再利用可能なUIコンポーネント
- `components/`: ビジネスロジック含むコンポーネント
- `hooks/`: カスタムフック
- `lib/`: ユーティリティ・設定

## GraphQL規約
- クエリ名: SCREAMING_SNAKE_CASE
- 自動生成された型を使用
- Apollo Clientでの型安全なクエリ実行

## CSS/スタイリング
- Tailwind CSS使用
- shadcn/uiコンポーネントライブラリ
- CSS-in-JSではなくTailwindクラス使用

## Git規約
- **コミットメッセージは日本語**
- ブランチ: main