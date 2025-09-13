import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ExternalLink } from "lucide-react"

const mockEvents = [
  {
    id: 1,
    title: "岩上真紀(sax)5 (田村さおり (fl) ,飯塚由加 (p) , 野々口毅 (b) , 小松誠二 (ds))",
    venue: "Sometime 吉祥寺",
    date: "2025年8月31日(日)",
    performers: ["岩上真紀", "田村さおり", "飯塚由加", "野々口毅", "小松誠二"],
    instruments: ["sax", "fl", "p", "b", "ds"],
  },
  {
    id: 2,
    title: "清水秀子(vo) (羽仁知治 (p) , 斉藤誠 (b) , 加納樹麻 (ds))",
    venue: "Sometime 吉祥寺",
    date: "2025年8月31日(日)",
    performers: ["清水秀子", "羽仁知治", "斉藤誠", "加納樹麻"],
    instruments: ["vo", "p", "b", "ds"],
  },
  {
    id: 3,
    title: "西山瞳NHORHMスペシャル 【昼の部】 (西山瞳(P) 鶴原良次(fretlessB) 江藤良人(Ds))",
    venue: "新宿 PIT INN",
    date: "2025年8月31日(日)",
    performers: ["西山瞳", "鶴原良次", "江藤良人"],
    instruments: ["P", "fretlessB", "Ds"],
  },
]

function groupEventsByDate(events: typeof mockEvents) {
  return events.reduce(
    (groups, event) => {
      const date = event.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(event)
      return groups
    },
    {} as Record<string, typeof mockEvents>,
  )
}

export function EventResults() {
  const groupedEvents = groupEventsByDate(mockEvents)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-primary">検索結果</h2>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {mockEvents.length}件の結果が見つかりました
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
                        <span className="text-lg font-semibold text-foreground">{event.venue}</span>
                      </div>

                      <CardTitle className="text-base font-serif leading-relaxed text-balance group-hover:text-primary transition-colors text-muted-foreground">
                        {event.title}
                      </CardTitle>
                    </div>

                    <ExternalLink className="h-4 w-4 text-accent shrink-0 group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">出演者・楽器</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.performers.map((performer, index) => (
                        <Badge
                          key={performer}
                          variant="outline"
                          className="text-xs border-accent/30 text-foreground hover:bg-accent/10"
                        >
                          {performer} ({event.instruments[index]})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
