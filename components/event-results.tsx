import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ExternalLink, Loader2 } from "lucide-react"
import { useSearchEvents } from "@/hooks/use-search-events"
import type { EventSearchInput } from "@/generated/graphql"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

interface EventResultsProps {
  searchInput: EventSearchInput
}

function groupEventsByDate(events: any[]) {
  return events.reduce(
    (groups, event) => {
      const date = format(new Date(event.startAt), "yyyy年MM月dd日(E)", { locale: ja })
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(event)
      return groups
    },
    {} as Record<string, any[]>,
  )
}

export function EventResults({ searchInput }: EventResultsProps) {
  const { data, loading, error } = useSearchEvents(searchInput)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg text-muted-foreground">検索中...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-destructive">エラーが発生しました: {error.message}</p>
      </div>
    )
  }

  const events = data?.searchEvents || []
  const groupedEvents = groupEventsByDate(events)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-primary">検索結果</h2>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {events.length}件の結果が見つかりました
        </Badge>
      </div>

      {Object.entries(groupedEvents).map(([date, events]) => (
        <div key={date} className="space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-accent/20">
            <Clock className="h-5 w-5 text-accent" />
            <h3 className="text-2xl font-serif font-bold text-primary">{date}</h3>
          </div>

          <div className="grid gap-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-card hover:bg-card/80 cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span className="text-lg font-semibold text-foreground">{event.venue.name}</span>
                      </div>

                      <CardTitle className="text-base font-serif leading-relaxed text-balance group-hover:text-primary transition-colors text-muted-foreground">
                        {event.title}
                      </CardTitle>

                      {event.price && (
                        <p className="text-sm text-muted-foreground">
                          料金: ¥{event.price.toLocaleString()}
                        </p>
                      )}
                    </div>

                    {event.url && (
                      <ExternalLink className="h-4 w-4 text-accent shrink-0 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </CardHeader>

                {event.url ? (
                  <a href={event.url} target="_blank" rel="noopener noreferrer">
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground">詳細情報</h4>
                        <p className="text-sm text-muted-foreground">
                          クリックして詳細を確認
                        </p>
                      </div>
                    </CardContent>
                  </a>
                ) : (
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">イベント詳細</h4>
                      <p className="text-sm text-muted-foreground">
                        詳細情報はありません
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
