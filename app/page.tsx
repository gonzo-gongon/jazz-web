import { JazzHeader } from "@/components/jazz-header"
import { EventSearch } from "@/components/event-search"
import { EventCalendar } from "@/components/event-calendar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <JazzHeader />
      <main className="container mx-auto px-4 py-8">
        <EventSearch />
        <EventCalendar />
      </main>
    </div>
  )
}
