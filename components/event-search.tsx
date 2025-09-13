"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calendar } from "lucide-react"

export function EventSearch() {
  const [searchQuery, setSearchQuery] = useState("ジャズセッション")
  const [displayCount, setDisplayCount] = useState("20")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

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
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ジャズセッション"
              className="bg-background border-border focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="count" className="text-sm font-medium">
              表示件数
            </Label>
            <Select value={displayCount} onValueChange={setDisplayCount}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10件</SelectItem>
                <SelectItem value="20">20件</SelectItem>
                <SelectItem value="50">50件</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              開始日
            </Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-background border-border focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              終了日
            </Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-background border-border focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button size="lg" className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            <Search className="h-5 w-5 mr-2" />
            検索
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
