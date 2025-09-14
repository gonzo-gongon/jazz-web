import { gql } from "@apollo/client"

export const SEARCH_EVENTS = gql`
  query SearchEvents($input: EventSearchInput!) {
    searchEvents(input: $input) {
      id
      venue {
        id
        name
      }
      title
      startAt
      price
      url
    }
  }
`