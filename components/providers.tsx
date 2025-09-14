"use client"

import { ApolloProvider } from "@apollo/client/react"
import type React from "react"
import client from "@/lib/apollo"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}