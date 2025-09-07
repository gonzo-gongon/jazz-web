# Jazz Web - プロジェクト概要

## プロジェクトの目的
東京のジャズライブハウスの情報を検索できるWebアプリケーション

## 主な機能
- ジャズイベント検索（楽器・場所・日時で検索可能）
- Cloudflare上でGoogleアカウント連携による認証（個人専用）
- 週1回のクローラーによる情報更新

## システム構成
- **フロントエンド**: Next.js + React + TypeScript + Tailwind CSS
- **バックエンド**: Cloudflare Pages/Workers + D1 (SQLite)
- **認証**: Cloudflare Access + Google OAuth
- **データ収集**: 別リポジトリ jazz-scraper (private)

## データベース設計 (D1/SQLite)
```sql
venues (id, name, area, address, url)
artists (id, name, instrument)  
events (id, venue_id, title, start_at, end_at, price_yen, url)
event_artists (event_id, artist_id, role) -- N:N関係
```

## ローカル開発環境
- D1ローカル: `.wrangler/state/d1/jazz.sqlite`
- 直接SQLite操作: `sqlite3 .wrangler/state/d1/jazz.sqlite`