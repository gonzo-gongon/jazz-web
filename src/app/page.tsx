"use client"

import { type FormEvent, type JSX, useId, useState } from "react"
import type { SearchFilters } from "../types"

export default function HomePage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({
    instrument: "",
    area: "",
    dateFrom: "",
    dateTo: "",
  })

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    // GraphQLクエリは後で実装
    console.log("Search:", { searchQuery, filters })
  }

  const handleFilterChange = (
    key: keyof SearchFilters,
    value: string
  ): void => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const instrumentAndArtistElementId = useId()
  const areaElementId = useId()
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
                楽器・アーティスト名
              </label>
              <input
                type="text"
                id={instrumentAndArtistElementId}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="例: サックス、山田太郎"
              />
            </div>

            <div>
              <label
                htmlFor={areaElementId}
                className="block text-sm font-medium mb-2"
              >
                エリア
              </label>
              <select
                id={areaElementId}
                value={filters.area}
                onChange={(e) => handleFilterChange("area", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">すべてのエリア</option>
                <option value="新宿">新宿</option>
                <option value="渋谷">渋谷</option>
                <option value="銀座">銀座</option>
                <option value="六本木">六本木</option>
                <option value="吉祥寺">吉祥寺</option>
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
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
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
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            検索
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">検索結果</h2>
        <p className="text-gray-600">
          GraphQLスキーマとクエリが実装されると、ここに検索結果が表示されます。
        </p>
      </div>
    </div>
  )
}
