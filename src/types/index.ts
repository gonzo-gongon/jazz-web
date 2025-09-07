// GraphQL型定義

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface EventSearchInput {
  startDate?: string
  endDate?: string
  titleSearchWord?: string
  venueIds?: string[]
  instrumentIds?: string[]
  sortOrder?: SortOrder
  limit?: number
  offset?: number
}

export interface Venue {
  id: string
  name: string
}

export interface Event {
  id: string
  title: string
  startAt: string
  price?: number
  url?: string
  venue: Venue
}

export interface SearchEventsResponse {
  searchEvents: Event[]
}

// 検索フィルター用の型（UI用）
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
