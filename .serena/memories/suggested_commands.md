# 開発・運用コマンド

## 開発サーバー
```bash
npm run dev                 # GraphQL型生成 + 開発サーバー起動
npm run codegen             # GraphQL型生成のみ
npm run codegen:watch       # GraphQL型生成（ウォッチモード）
```

## コード品質
```bash
npm run lint               # Biomeによるコードチェック
npm run lint:fix           # Biomeによる自動修正
npm run format             # Biomeによるフォーマット
```

## ビルド・デプロイ
```bash
npm run pages:build        # Cloudflare Pages用ビルド
npm run preview            # ローカルプレビュー
npm run deploy             # Cloudflare Pagesへデプロイ
```

## Cloudflare関連
```bash
npm run cf-typegen         # Cloudflare Worker型生成
wrangler pages dev         # Cloudflareローカル開発
```

## GraphQL
- GraphQL Code Generatorによる自動型生成
- 設定ファイル: `codegen.yml`
- 生成先: `generated/graphql.ts`

## 開発フロー
1. `npm run dev` で開発サーバー起動
2. コード変更
3. `npm run lint` でコード品質チェック
4. `npm run pages:build` でビルド確認
5. `npm run deploy` でデプロイ

## 必須コマンド実行順序
1. GraphQL型生成が必要な場合は `npm run codegen`
2. 開発時は `npm run dev`（自動でcodegenも実行）
3. デプロイ前は必ず `npm run lint` でコード品質確認