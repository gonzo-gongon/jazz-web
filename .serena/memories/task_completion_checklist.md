# タスク完了時のチェックリスト

## 必須実行コマンド
タスク完了後は以下のコマンドを順番に実行してください：

### 1. コード品質チェック
```bash
npm run lint                 # Biomeリンターチェック
npm run lint:fix            # エラーがあれば自動修正実行
```

### 2. フォーマット
```bash
npm run format              # コードフォーマット実行
```

### 3. ビルドテスト
```bash
npm run build               # プロダクションビルド確認
```

## 任意実行コマンド
必要に応じて以下も実行：

### 開発環境での動作確認
```bash
npm run dev                 # 開発サーバーで動作確認
# または
npm run preview             # Cloudflare Pages環境での確認
```

### データベース関連の変更がある場合
```bash
npx wrangler d1 migrations apply jazz --local  # マイグレーション実行
```

## 注意事項
- **リンターエラー**: 必ず解消してからcommit
- **ビルドエラー**: 修正してからデプロイ可能な状態に
- **型エラー**: TypeScriptの型チェックを通すこと
- **コードレビュー**: 変更内容が適切かダブルチェック