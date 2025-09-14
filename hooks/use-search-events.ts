import { useQuery } from "@apollo/client/react"
import type { EventSearchInput, SearchEventsQuery } from "@/generated/graphql"
import { SEARCH_EVENTS } from "@/lib/queries"

export const useSearchEvents = (input: EventSearchInput) => {
  return useQuery<SearchEventsQuery>(SEARCH_EVENTS, {
    variables: { input },
    errorPolicy: "all",
  })
}
