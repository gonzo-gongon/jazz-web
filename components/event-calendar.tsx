"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

const mockEvents = [
  {
    id: 1,
    title: "岩上真紀(sax)5 (田村さおり (fl) ,飯塚由加 (p) , 野々口毅 (b) , 小松誠二 (ds))",
    venue: "Sometime 吉祥寺",
    date: "2025-08-31",
    dateDisplay: "2025年8月31日(日)",
    performers: ["岩上真紀", "田村さおり", "飯塚由加", "野々口毅", "小松誠二"],
    instruments: ["sax", "fl", "p", "b", "ds"],
  },
  {
    id: 2,
    title: "清水秀子(vo) (羽仁知治 (p) , 斉藤誠 (b) , 加納樹麻 (ds))",
    venue: "Sometime 吉祥寺",
    date: "2025-08-31",
    dateDisplay: "2025年8月31日(日)",
    performers: ["清水秀子", "羽仁知治", "斉藤誠", "加納樹麻"],
    instruments: ["vo", "p", "b", "ds"],
  },
  {
    id: 3,
    title: "西山瞳NHORHMスペシャル 【昼の部】 (西山瞳(P) 鶴原良次(fretlessB) 江藤良人(Ds))",
    venue: "新宿 PIT INN",
    date: "2025-09-01",
    dateDisplay: "2025年9月1日(月)",
    performers: ["西山瞳", "鶴原良次", "江藤良人"],
    instruments: ["P", "fretlessB", "Ds"],
  },
  {
    id: 4,
    title: "ジャズセッション",
    venue: "Blue Note Tokyo",
    date: "2025-09-02",
    dateDisplay: "2025年9月2日(火)",
    performers: ["Various Artists"],
    instruments: ["All"],
  },
  {
    id: 5,
    title: "ピアノトリオライブ",
    venue: "Cotton Club",
    date: "2025-09-05",
    dateDisplay: "2025年9月5日(金)",
    performers: ["山田太郎", "田中次郎", "佐藤三郎"],
    instruments: ["p", "b", "ds"],
  },
]

export function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)) // August 2025

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (dateStr: string) => {
    return mockEvents.filter((event) => event.date === dateStr)
  }

  const formatDateForComparison = (year: number, month: number, day: number) => {
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

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
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

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-primary">イベントカレンダー</h2>
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
              return <div key={index} className="h-40 border-r border-b border-border last:border-r-0" />
            }

            const dateStr = formatDateForComparison(currentDate.getFullYear(), currentDate.getMonth(), day)
            const dayEvents = getEventsForDate(dateStr)
            const isToday =
              new Date().toDateString() ===
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

            return (
              <div
                key={day}
                className={`h-40 border-r border-b border-border last:border-r-0 p-2 ${
                  isToday ? "bg-accent/10" : "bg-background"
                } hover:bg-muted/50 transition-colors`}
              >
                <div className={`text-sm font-semibold mb-2 ${isToday ? "text-accent" : "text-foreground"}`}>{day}</div>

                <div className="space-y-1 overflow-hidden h-32">
                  {dayEvents.length === 0 && (
                    <div className="text-xs text-muted-foreground/50 italic">イベントなし</div>
                  )}

                  {dayEvents.length > 0 && dayEvents.length <= 4 && (
                    <>
                      {dayEvents.map((event) => (
                        <Card
                          key={event.id}
                          className="group cursor-pointer hover:shadow-md transition-all duration-200 border-0 bg-card/80 hover:bg-primary/10"
                        >
                          <CardContent className="p-1.5">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-2.5 w-2.5 text-accent shrink-0" />
                                <span className="text-xs font-semibold text-foreground truncate">{event.venue}</span>
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1 leading-tight">
                                {event.title}
                              </div>
                              <ExternalLink className="h-2.5 w-2.5 text-accent/60 group-hover:text-primary transition-colors ml-auto" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </>
                  )}

                  {dayEvents.length > 4 && (
                    <>
                      {dayEvents.slice(0, 3).map((event) => (
                        <Card
                          key={event.id}
                          className="group cursor-pointer hover:shadow-md transition-all duration-200 border-0 bg-card/80 hover:bg-primary/10"
                        >
                          <CardContent className="p-1.5">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-2.5 w-2.5 text-accent shrink-0" />
                                <span className="text-xs font-semibold text-foreground truncate">{event.venue}</span>
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1 leading-tight">
                                {event.title}
                              </div>
                              <ExternalLink className="h-2.5 w-2.5 text-accent/60 group-hover:text-primary transition-colors ml-auto" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full h-6 text-xs text-primary hover:bg-primary/10 hover:text-primary"
                          >
                            <Calendar className="h-3 w-3 mr-1" />+{dayEvents.length - 3} 件のイベント
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-serif">
                              {currentDate.getFullYear()}年{monthNames[currentDate.getMonth()]}
                              {day}日のイベント
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 mt-4">
                            {dayEvents.map((event) => (
                              <Card
                                key={event.id}
                                className="group cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-primary/5"
                              >
                                <CardContent className="p-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-accent shrink-0" />
                                      <span className="font-semibold text-foreground">{event.venue}</span>
                                      <ExternalLink className="h-4 w-4 text-accent/60 group-hover:text-primary transition-colors ml-auto" />
                                    </div>
                                    <h4 className="text-sm font-medium text-foreground leading-relaxed">
                                      {event.title}
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                      {event.performers.map((performer, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {performer} ({event.instruments[idx] || ""})
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
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
          {mockEvents.length}件のイベントが見つかりました
        </Badge>
      </div>
    </div>
  )
}
