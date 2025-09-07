"use client"

import { type JSX, useId, useState } from "react"
import { useSearchEvents } from "@/hooks/useSearchEvents"
import { type EventSearchInput, SortOrder } from "@/types"

export default function EventSearch(): JSX.Element {
  const [input, setInput] = useState<EventSearchInput>({
    limit: 20,
    sortOrder: SortOrder.DESC,
  })

  const { data, loading, error } = useSearchEvents(input)

  const handleSearch = () => {
    // 検索パラメータを更新してクエリを再実行
    setInput((prev) => ({ ...prev }))
  }

  const formId = useId()

  if (loading) return <div>読み込み中...</div>
  if (error) return <div>エラーが発生しました: {error.message}</div>

  return (
    <div className="p-4">
      <form id={formId}>
        <h1 className="text-2xl font-bold mb-4">イベント検索</h1>

        <div className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="イベントタイトル検索"
            className="w-full p-2 border border-gray-300 rounded"
            value={input.titleSearchWord || ""}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, titleSearchWord: e.target.value }))
            }
          />
          <input
            type="date"
            placeholder="開始日"
            className="w-full p-2 border border-gray-300 rounded"
            value={input.startDate || ""}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
          <input
            type="date"
            placeholder="終了日"
            className="w-full p-2 border border-gray-300 rounded"
            value={input.endDate || ""}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            検索
          </button>
        </div>

        <div className="space-y-4">
          {data?.searchEvents.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.venue.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(event.startAt).toLocaleDateString("ja-JP")}
              </p>
              {event.price && (
                <p className="text-sm">¥{event.price.toLocaleString()}</p>
              )}
              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  詳細を見る
                </a>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}
