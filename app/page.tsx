"use client"

import { useCallback, useState } from "react"
import { EventCalendar } from "@/components/event-calendar"
import { EventSearch } from "@/components/event-search"
import { JazzHeader } from "@/components/jazz-header"
import { type EventSearchInput, SortOrder } from "@/generated/graphql"

export default function HomePage() {
  const [searchInput, setSearchInput] = useState<EventSearchInput>({
    titleSearchWord: "",
    instrumentIds: [],
    venueIds: [],
    startDate: undefined,
    endDate: undefined,
    sortOrder: SortOrder.Asc,
    limit: 1000,
    offset: 0,
  })

  const [showResults, setShowResults] = useState(true)

  const handleSearch = (input: EventSearchInput) => {
    setSearchInput(input)
    setShowResults(true)
  }

  const handleDateRangeChange = useCallback(
    (startDate: Date, endDate: Date) => {
      setSearchInput((prev) => ({
        ...prev,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }))
    },
    []
  )

  return (
    <div className="min-h-screen bg-background">
      <JazzHeader />
      <main className="container mx-auto px-4 py-8">
        <EventSearch onSearch={handleSearch} />
        {!showResults && (
          <EventCalendar onDateRangeChange={handleDateRangeChange} />
        )}
        {showResults && (
          <EventCalendar
            searchInput={searchInput}
            onDateRangeChange={handleDateRangeChange}
          />
        )}
      </main>
    </div>
  )
}
