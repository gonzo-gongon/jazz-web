import { useQuery } from "@apollo/client/react"
import { SEARCH_EVENTS } from "@/lib/queries"
import type { EventSearchInput, SearchEventsResponse } from "@/types"

export const useSearchEvents = (input: EventSearchInput) => {
  return useQuery<SearchEventsResponse>(SEARCH_EVENTS, {
    variables: { input },
    errorPolicy: "all",
  })
}
