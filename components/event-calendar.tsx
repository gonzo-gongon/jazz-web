"use client"

import { format } from "date-fns"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  MapPin,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { EventSearchInput } from "@/generated/graphql"
import { useSearchEvents } from "@/hooks/use-search-events"

interface EventCalendarProps {
  searchInput?: EventSearchInput
  onDateRangeChange?: (startDate: Date, endDate: Date) => void
}

const openDetailPageTab = (url?: string | null) => {
  window.open(url ? url : "", "_blank")
}

export function EventCalendar({
  searchInput,
  onDateRangeChange,
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Use GraphQL data if searchInput is provided, otherwise show empty calendar
  const { data, loading, error } = searchInput
    ? useSearchEvents(searchInput)
    : { data: null, loading: false, error: null }

  const events = data?.searchEvents || []

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (dateStr: string) => {
    return events.filter((event) => {
      if (event.startAt) {
        const eventDate = format(new Date(event.startAt), "yyyy-MM-dd")
        return eventDate === dateStr
      }
      return false
    })
  }

  const formatDateForComparison = (
    year: number,
    month: number,
    day: number
  ) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  // Notify parent component of date range changes
  useEffect(() => {
    if (onDateRangeChange) {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59)
      onDateRangeChange(startOfMonth, endOfMonth)
    }
  }, [currentDate, onDateRangeChange])

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ]
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"]

  // Create calendar grid
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg text-muted-foreground">
          イベント情報を読み込み中...
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-destructive">
          エラーが発生しました: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-primary">日程</h2>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("prev")}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-xl font-serif font-semibold text-foreground min-w-[120px] text-center">
            {currentDate.getFullYear()}年{monthNames[currentDate.getMonth()]}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("next")}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card rounded-lg border border-primary/20 overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-primary text-primary-foreground">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-3 text-center font-semibold border-r border-primary-foreground/20 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return (
                <div
                  key={index}
                  className="h-40 border-r border-b border-border last:border-r-0"
                />
              )
            }

            const dateStr = formatDateForComparison(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            )
            const dayEvents = getEventsForDate(dateStr)
            const isToday =
              new Date().toDateString() ===
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              ).toDateString()

            return (
              <div
                key={`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`}
                className={`h-40 border-r border-b border-border last:border-r-0 p-2 ${
                  isToday ? "bg-accent/10" : "bg-background"
                } hover:bg-muted/50 transition-colors`}
              >
                <div
                  className={`text-sm font-semibold mb-2 ${isToday ? "text-accent" : "text-foreground"}`}
                >
                  {day}
                </div>

                <div className="space-y-1 overflow-hidden h-32">
                  {dayEvents.length > 0 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full h-6 px-1 text-xs text-primary justify-start hover:bg-primary/10 hover:text-primary hover:cursor-pointer"
                        >
                          {dayEvents.length} 件のイベント
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-serif">
                            {currentDate.getFullYear()}年
                            {monthNames[currentDate.getMonth()]}
                            {day}日のイベント
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 mt-4">
                          {dayEvents.map((event) => (
                            <Card
                              key={event.id}
                              className="group hover:shadow-md transition-all duration-200 hover:bg-primary/5 hover:cursor-pointer"
                              onClick={() => openDetailPageTab(event?.url)}
                            >
                              <CardContent className="p-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-accent shrink-0" />
                                    <span className="font-semibold text-foreground">
                                      {event.venue?.name || event.venue}
                                    </span>
                                    {event.url && (
                                      <ExternalLink className="h-4 w-4 text-accent/60 group-hover:text-primary transition-colors ml-auto" />
                                    )}
                                  </div>
                                  <h4 className="text-sm font-medium text-foreground leading-relaxed">
                                    {event.title}
                                  </h4>
                                  {event.performers && (
                                    <div className="flex flex-wrap gap-1">
                                      {event.performers.map(
                                        (performer: string, idx: number) => (
                                          <Badge
                                            key={`${event.id}-performer-${idx}`}
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            {performer} (
                                            {event.instruments?.[idx] || ""})
                                          </Badge>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Event Count Summary */}
      <div className="flex justify-center">
        <Badge variant="secondary" className="text-sm px-4 py-2">
          {events.length}件のイベントが見つかりました
        </Badge>
      </div>
    </div>
  )
}
