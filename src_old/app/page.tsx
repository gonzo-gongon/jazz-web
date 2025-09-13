"use client"

import {
  type FormEvent,
  type JSX,
  useCallback,
  useId,
  useRef,
  useState,
} from "react"
import { useSearchEvents } from "@/hooks/useSearchEvents"
import { type EventSearchInput, SortOrder } from "@/generated/graphql"

export default function HomePage(): JSX.Element {
  const [searchInput, setSearchInput] = useState<EventSearchInput>({
    limit: 20,
    sortOrder: SortOrder.Desc,
  })

  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput)
  const { data, loading, error } = useSearchEvents(debouncedSearchInput)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    setDebouncedSearchInput(searchInput)
  }

  const debouncedSearch = useCallback((inputToSearch: EventSearchInput) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchInput(inputToSearch)
    }, 300)
  }, [])

  const updateSearchInput = (updates: Partial<EventSearchInput>): EventSearchInput => {
    const newSearchInput = { ...searchInput, ...updates }
    setSearchInput(newSearchInput)
    return newSearchInput
  }

  const instrumentAndArtistElementId = useId()
  const limitSelectElementId = useId()
  const startDateElementId = useId()
  const endDateElementId = useId()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Jazz Web - 東京ジャズライブハウス情報
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">イベント検索</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor={instrumentAndArtistElementId}
                className="block text-sm font-medium mb-2"
              >
                イベントタイトル検索
              </label>
              <input
                type="text"
                id={instrumentAndArtistElementId}
                value={searchInput.titleSearchWord || ""}
                onChange={(e) => {
                  const newSearchInput = updateSearchInput({ titleSearchWord: e.target.value })
                  debouncedSearch(newSearchInput)
                }}
                onBlur={handleSubmit}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="例: ジャズセッション、ライブ"
              />
            </div>

            <div>
              <label
                htmlFor={limitSelectElementId}
                className="block text-sm font-medium mb-2"
              >
                表示件数
              </label>
              <select
                id={limitSelectElementId}
                value={searchInput.limit || 20}
                onChange={(e) => {
                  const newSearchInput = updateSearchInput({ limit: Number(e.target.value) })
                  setDebouncedSearchInput(newSearchInput)
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value={10}>10件</option>
                <option value={20}>20件</option>
                <option value={50}>50件</option>
                <option value={100}>100件</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={startDateElementId}
                className="block text-sm font-medium mb-2"
              >
                開始日
              </label>
              <input
                type="date"
                id={startDateElementId}
                value={searchInput.startDate || ""}
                onChange={(e) => {
                  const newSearchInput = updateSearchInput({ startDate: e.target.value })
                  setDebouncedSearchInput(newSearchInput)
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor={endDateElementId}
                className="block text-sm font-medium mb-2"
              >
                終了日
              </label>
              <input
                type="date"
                id={endDateElementId}
                value={searchInput.endDate || ""}
                onChange={(e) => {
                  const newSearchInput = updateSearchInput({ endDate: e.target.value })
                  setDebouncedSearchInput(newSearchInput)
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "検索中..." : "検索"}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">検索結果</h2>

        {loading && <p className="text-gray-600">読み込み中...</p>}

        {error && (
          <div className="text-red-600 mb-4">
            エラーが発生しました: {error.message}
          </div>
        )}

        {data?.searchEvents && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              {data.searchEvents.length}件の結果が見つかりました
            </p>

            {data.searchEvents.map((event) => (
              <div key={event.id} className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>会場:</strong> {event.venue.name}
                  </p>
                  <p>
                    <strong>日時:</strong>{" "}
                    {new Date(event.startAt).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "short",
                    })}
                  </p>
                  {event.price && (
                    <p>
                      <strong>料金:</strong> ¥{event.price.toLocaleString()}
                    </p>
                  )}
                  {event.url && (
                    <div className="mt-2">
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm underline"
                      >
                        詳細を見る
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {data?.searchEvents && data.searchEvents.length === 0 && (
          <p className="text-gray-600">
            検索条件に一致するイベントが見つかりませんでした。
          </p>
        )}
      </div>
    </div>
  )
}
