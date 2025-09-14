"use client"

import { Search } from "lucide-react"
import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type EventSearchInput, SortOrder } from "@/generated/graphql"

interface EventSearchProps {
  onSearch: (input: EventSearchInput) => void
}

export function EventSearch({ onSearch }: EventSearchProps) {
  const searchId = useId()

  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    const searchInput: EventSearchInput = {
      titleSearchWord: searchQuery || undefined,
      instrumentIds: [],
      venueIds: [],
      startDate: undefined,
      endDate: undefined,
      sortOrder: SortOrder.Asc,
      limit: 50,
      offset: 0,
    }
    onSearch(searchInput)
  }

  return (
    <Card className="mb-8 shadow-lg border-0 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-serif text-primary flex items-center gap-2">
          <Search className="h-6 w-6" />
          イベント検索
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium">
              イベントタイトル検索
            </Label>
            <Input
              id={searchId}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ジャズセッション"
              className="bg-background border-border focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleSearch}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Search className="h-5 w-5 mr-2" />
            検索
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
