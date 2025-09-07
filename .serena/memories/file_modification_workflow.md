# ファイル変更ワークフロー

## 基本方針
Claudeでファイル変更した後は、Serenaのシンボリック編集ツールを使用してファイル変更を行う。

## 推奨ツール使用順序

### 1. コード理解・探索フェーズ
```bash
# ディレクトリ構造確認
mcp__serena__list_dir

# ファイル検索
mcp__serena__find_file

# シンボル概要取得
mcp__serena__get_symbols_overview

# 特定シンボル検索
mcp__serena__find_symbol
```

### 2. ファイル変更フェーズ
```bash
# シンボル本体置換（関数・クラス全体）
mcp__serena__replace_symbol_body

# シンボル後に挿入（新しい関数・クラス追加）
mcp__serena__insert_after_symbol  

# シンボル前に挿入（import文追加など）
mcp__serena__insert_before_symbol
```

### 3. 参照関係確認フェーズ
```bash
# 参照元シンボル検索
mcp__serena__find_referencing_symbols

# パターン検索（コード中の特定パターン）
mcp__serena__search_for_pattern
```

## ファイル変更時の注意点

### Serena優先ルール
- **必須**: まずSerenaのシンボリック編集ツールを使用
- **例外**: Serenaで対応困難な場合のみ他ツール使用
- **効率**: ファイル全体読み込み前にシンボル概要で確認

### 変更タイプ別アプローチ
- **関数・クラス全体変更**: `replace_symbol_body`
- **新規コード追加**: `insert_after_symbol` / `insert_before_symbol`  
- **部分的変更**: パターン検索後に適切なツール選択

### コード品質確保
- 変更後は必ず `npm run lint` と `npm run format` を実行
- TypeScript型チェックも確認
- 参照関係が壊れていないか `find_referencing_symbols` で確認

## 実践例

### 新しい関数追加
1. `get_symbols_overview` でファイル構造確認
2. `insert_after_symbol` で最適な位置に追加
3. `find_referencing_symbols` で依存関係確認

### 既存関数修正
1. `find_symbol` で対象関数特定
2. `replace_symbol_body` で関数全体置換
3. コード品質チェック実行