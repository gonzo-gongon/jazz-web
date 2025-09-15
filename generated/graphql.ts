import * as Apollo from "@apollo/client"
import { gql } from "@apollo/client"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
    }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Event = {
  __typename?: "Event"
  endAt?: Maybe<Scalars["String"]["output"]>
  id: Scalars["ID"]["output"]
  price?: Maybe<Scalars["Int"]["output"]>
  startAt: Scalars["String"]["output"]
  title: Scalars["String"]["output"]
  url?: Maybe<Scalars["String"]["output"]>
  venue: Venue
  venueId: Scalars["ID"]["output"]
}

export type EventSearchInput = {
  endDate?: InputMaybe<Scalars["String"]["input"]>
  instrumentIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
  limit?: InputMaybe<Scalars["Int"]["input"]>
  offset?: InputMaybe<Scalars["Int"]["input"]>
  sortOrder?: InputMaybe<SortOrder>
  startDate?: InputMaybe<Scalars["String"]["input"]>
  titleSearchWord?: InputMaybe<Scalars["String"]["input"]>
  venueIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type Instrument = {
  __typename?: "Instrument"
  id: Scalars["ID"]["output"]
  name: Scalars["String"]["output"]
}

export type Query = {
  __typename?: "Query"
  searchEvents: Array<Event>
}

export type QuerySearchEventsArgs = {
  input: EventSearchInput
}

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC",
}

export type Venue = {
  __typename?: "Venue"
  address?: Maybe<Scalars["String"]["output"]>
  events: Array<Event>
  id: Scalars["ID"]["output"]
  name: Scalars["String"]["output"]
  url?: Maybe<Scalars["String"]["output"]>
}

export type SearchEventsQueryVariables = Exact<{
  input: EventSearchInput
}>

export type SearchEventsQuery = {
  __typename?: "Query"
  searchEvents: Array<{
    __typename?: "Event"
    id: string
    title: string
    startAt: string
    price?: number | null
    url?: string | null
    venue: { __typename?: "Venue"; id: string; name: string }
  }>
}

export const SearchEventsDocument = gql`
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

/**
 * __useSearchEventsQuery__
 *
 * To run a query within a React component, call `useSearchEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchEventsQuery,
    SearchEventsQueryVariables
  > &
    (
      | { variables: SearchEventsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchEventsQuery, SearchEventsQueryVariables>(
    SearchEventsDocument,
    options
  )
}
export function useSearchEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchEventsQuery,
    SearchEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchEventsQuery, SearchEventsQueryVariables>(
    SearchEventsDocument,
    options
  )
}
export function useSearchEventsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SearchEventsQuery,
        SearchEventsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<SearchEventsQuery, SearchEventsQueryVariables>(
    SearchEventsDocument,
    options
  )
}
export type SearchEventsQueryHookResult = ReturnType<
  typeof useSearchEventsQuery
>
export type SearchEventsLazyQueryHookResult = ReturnType<
  typeof useSearchEventsLazyQuery
>
export type SearchEventsSuspenseQueryHookResult = ReturnType<
  typeof useSearchEventsSuspenseQuery
>
export type SearchEventsQueryResult = Apollo.QueryResult<
  SearchEventsQuery,
  SearchEventsQueryVariables
>
