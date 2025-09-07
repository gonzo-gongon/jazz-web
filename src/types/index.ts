// 基本的な型定義（GraphQLスキーマ導入前の暫定版）

export interface SearchFilters {
  instrument: string
  area: string
  dateFrom: string
  dateTo: string
}

export interface SearchState {
  query: string
  filters: SearchFilters
}

// 後でGraphQLスキーマから自動生成される予定
export interface Event {
  id: string
  title: string
  startAt: string
  endAt?: string
  priceYen?: number
  url?: string
  venue: {
    id: string
    name: string
    area: string
    address?: string
  }
  artists: Array<{
    id: string
    name: string
    instrument?: string
    role?: string
  }>
}
