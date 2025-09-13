import { useQuery } from "@apollo/client/react"
import { SEARCH_EVENTS } from "@/lib/queries"
import type { EventSearchInput, SearchEventsQuery } from "@/generated/graphql"

export const useSearchEvents = (input: EventSearchInput) => {
  return useQuery<SearchEventsQuery>(SEARCH_EVENTS, {
    variables: { input },
    errorPolicy: "all",
  })
}
